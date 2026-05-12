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

async function translateBatch(texts, targetLanguage) {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: texts,
        target: targetLanguage,
        format: 'text'
      })
    });
    
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    return data.data.translations.map(t => t.translatedText);
  } catch (error) {
    console.error(`Error translating batch to ${targetLanguage}:`, error.message);
    return null;
  }
}

async function translateObject(obj, targetLanguage) {
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  
  console.log(`Translating ${keys.length} keys to ${targetLanguage}...`);
  const translatedValues = await translateBatch(values, targetLanguage);
  
  if (!translatedValues) return obj;
  
  const result = {};
  keys.forEach((key, index) => {
    result[key] = translatedValues[index];
  });
  return result;
}

async function processModule(moduleName) {
  const i18nPath = path.resolve(process.cwd(), 'src/features/pride', moduleName, 'i18n');
  const enPath = path.join(i18nPath, 'en.json');
  
  if (!fs.existsSync(enPath)) {
    console.error(`❌ en.json not found for module ${moduleName} at ${enPath}`);
    return;
  }
  
  const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  
  for (const lang of SUPPORTED_LANGUAGES) {
    const langPath = path.join(i18nPath, `${lang}.json`);
    
    // Skip if already exists (optional, but good for resuming)
    // if (fs.existsSync(langPath)) {
    //   console.log(`skipping ${lang} for ${moduleName}, already exists.`);
    //   continue;
    // }
    
    console.log(`\n🌍 Translating ${moduleName} to ${lang}...`);
    const translatedData = await translateObject(enData, lang);
    
    fs.writeFileSync(langPath, JSON.stringify(translatedData, null, 2));
    console.log(`✅ Saved ${langPath}`);
  }
}

const moduleName = process.argv[2];
if (!moduleName) {
  console.error('Usage: node scripts/translate.mjs <module-name>');
  process.exit(1);
}

processModule(moduleName);
