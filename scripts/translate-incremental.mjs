import fs from 'fs';
import path from 'path';

let API_KEY = process.env.VITE_GOOGLE_TRANSLATION_API_KEY;
if (!API_KEY && fs.existsSync('.env')) {
    const env = fs.readFileSync('.env', 'utf8');
    const match = env.match(/VITE_GOOGLE_TRANSLATION_API_KEY="?([^"\n]+)"?/);
    if (match) API_KEY = match[1];
}

const i18nDir = 'src/features/pride/hub/i18n';
const enPath = path.join(i18nDir, 'en.json');
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

const SUPPORTED_LANGUAGES = ['es', 'fr', 'de', 'pt', 'ru', 'zh-Hans', 'zh-Hant', 'ja', 'ko', 'ar', 'hi', 'bn', 'id', 'tr', 'vi', 'it', 'pl', 'th', 'tl', 'nl', 'sv', 'no', 'da', 'fi', 'cs', 'el', 'ro', 'hu', 'uk', 'he', 'ms', 'ta', 'te', 'ur'];

async function translateBatch(texts, target) {
    if (texts.length === 0) return [];
    const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: texts, target })
    });
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.data.translations.map(t => t.translatedText);
}

async function run() {
    for (const lang of SUPPORTED_LANGUAGES) {
        const langPath = path.join(i18nDir, `${lang}.json`);
        let langData = {};
        if (fs.existsSync(langPath)) {
            try {
                langData = JSON.parse(fs.readFileSync(langPath, 'utf8'));
            } catch (e) {}
        }
        
        const missingKeys = Object.keys(enData).filter(k => !langData[k] || langData[k] === enData[k]);
        
        if (missingKeys.length > 0) {
            console.log(`Translating ${missingKeys.length} keys to ${lang}...`);
            const BATCH_SIZE = 50;
            for (let i = 0; i < missingKeys.length; i += BATCH_SIZE) {
                const batch = missingKeys.slice(i, i + BATCH_SIZE);
                try {
                    const translatedBatch = await translateBatch(batch.map(k => enData[k]), lang);
                    batch.forEach((key, idx) => {
                        langData[key] = translatedBatch[idx];
                    });
                    process.stdout.write('.');
                    // Save incrementally
                    fs.writeFileSync(langPath, JSON.stringify(langData, null, 2));
                } catch (e) {
                    console.error(`\nError translating batch to ${lang}: ${e.message}`);
                    if (e.message.includes('Limit') || e.message.includes('403') || e.message.includes('429')) {
                        console.log("Waiting 15s...");
                        await new Promise(r => setTimeout(r, 15000));
                        i -= BATCH_SIZE; // Retry this batch
                    }
                }
            }
            console.log(`\nFinished ${lang}.json`);
        } else {
            console.log(`No missing keys for ${lang}`);
        }
    }
}

run();
