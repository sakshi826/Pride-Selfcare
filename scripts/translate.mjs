import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const API_KEY = process.env.VITE_GOOGLE_TRANSLATION_API_KEY;

if (!API_KEY) {
  console.error('❌ VITE_GOOGLE_TRANSLATION_API_KEY not found in .env');
  process.exit(1);
}

const SUPPORTED_LANGUAGES = [
  'es', 'fr', 'de', 'pt', 'ru',
  'zh-Hans', 'zh-Hant', 'ja', 'ko',
  'ar', 'hi', 'bn', 'id', 'tr', 'vi',
  'it', 'pl', 'th', 'tl', 'nl', 'sv',
  'no', 'da', 'fi', 'cs', 'el', 'ro',
  'hu', 'uk', 'he', 'ms', 'ta', 'te', 'ur'
];

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function translateBatch(texts, targetLanguage, retryCount = 0) {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
  
  const CHUNK_SIZE = 50;
  const results = [];
  
  for (let i = 0; i < texts.length; i += CHUNK_SIZE) {
    const chunk = texts.slice(i, i + CHUNK_SIZE);
    let attempt = 0;
    let success = false;

    while (attempt < 3 && !success) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            q: chunk,
            target: targetLanguage,
            format: 'text'
          })
        });

        const data = await response.json();
        if (data.error) {
          if (data.error.message.includes('Rate Limit') || data.error.code === 429) {
            const waitTime = Math.pow(2, attempt) * 2000;
            console.log(`  ⚠️ Rate limit hit. Retrying in ${waitTime}ms... (Attempt ${attempt + 1})`);
            await sleep(waitTime);
            attempt++;
            continue;
          }
          throw new Error(data.error.message);
        }
        results.push(...data.data.translations.map(t => t.translatedText));
        success = true;
      } catch (error) {
        console.error(`  ❌ Error translating chunk to ${targetLanguage}:`, error.message);
        attempt++;
        if (attempt === 3) {
          results.push(...chunk); // Fallback to original
        } else {
          await sleep(1000);
        }
      }
    }
    // Small delay between chunks to be nice to the API
    await sleep(200);
  }
  return results;
}

async function translateFile(enFilePath, outputDir, lang, outputPrefix, force = false) {
  const outputPath = path.join(outputDir, `${outputPrefix}${lang}.json`);
  
  // Support resume: skip if file exists unless forced
  if (fs.existsSync(outputPath) && !force) {
    console.log(`  ⏩ Skipping ${lang} (already exists)`);
    return;
  }

  const enData = JSON.parse(fs.readFileSync(enFilePath, 'utf8'));
  const keys = Object.keys(enData);
  const values = Object.values(enData);
  
  const placeholderMap = {};
  const safeValues = values.map((v, i) => {
    if (typeof v !== 'string') return v;
    const matches = v.match(/\{\{[^}]+\}\}/g) || [];
    let safe = v;
    matches.forEach((m, j) => {
      const token = `__PH_${i}_${j}__`;
      placeholderMap[token] = m;
      safe = safe.replace(m, token);
    });
    return safe;
  });

  console.log(`  Translating ${keys.length} keys to ${lang}...`);
  const translated = await translateBatch(safeValues, lang);

  const result = {};
  keys.forEach((key, index) => {
    let val = translated[index];
    if (typeof val === 'string') {
      Object.entries(placeholderMap).forEach(([token, original]) => {
        val = val.replace(new RegExp(token, 'g'), original);
      });
    }
    result[key] = val;
  });

  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`  ✅ ${outputPath}`);
}

async function processModuleFile(modulePath, fileName, force = false) {
  const enFilePath = path.resolve(process.cwd(), modulePath, fileName);
  const outputDir = path.resolve(process.cwd(), modulePath);
  
  if (!fs.existsSync(enFilePath)) {
    console.error(`❌ File not found: ${enFilePath}`);
    return;
  }

  const baseName = fileName.replace(/\.en\.json$/, '').replace(/\.json$/, '');
  const outputPrefix = (baseName === 'en' || baseName === '') ? '' : `${baseName}.`;

  console.log(`\n📂 Processing: ${modulePath}/${fileName}`);
  
  const enData = JSON.parse(fs.readFileSync(enFilePath, 'utf8'));
  const enOutputPath = path.join(outputDir, `${outputPrefix === '' ? 'en.json' : `${outputPrefix}en.json`}`);
  if (enOutputPath !== enFilePath) {
    fs.writeFileSync(enOutputPath, JSON.stringify(enData, null, 2), 'utf8');
  }

  for (const lang of SUPPORTED_LANGUAGES) {
    await translateFile(enFilePath, outputDir, lang, outputPrefix, force);
    // Delay between languages to prevent aggressive rate limiting
    await sleep(2000);
  }
}

const modulePath = process.argv[2];
const fileName = process.argv[3] || 'en.json';
const force = process.argv.includes('--force');

if (!modulePath) {
  console.error('Usage: node scripts/translate.mjs <i18n-dir-path> [source-file] [--force]');
  process.exit(1);
}

processModuleFile(modulePath, fileName, force);
