import fs from 'fs';
import path from 'path';

const enFile = 'src/features/pride/hub/i18n/minis.en.json';
const SUPPORTED_LANGUAGES = ['hi', 'es', 'fr', 'de', 'pt', 'ru', 'zh-Hans', 'zh-Hant', 'ja', 'ko', 'ar', 'bn', 'id', 'tr', 'vi', 'it', 'pl', 'th', 'tl', 'nl', 'sv', 'no', 'da', 'fi', 'cs', 'el', 'ro', 'hu', 'uk', 'he', 'ms', 'ta', 'te', 'ur'];

const enData = JSON.parse(fs.readFileSync(enFile, 'utf8'));

SUPPORTED_LANGUAGES.forEach(lang => {
    const filePath = `src/features/pride/hub/i18n/minis.${lang}.json`;
    let langData = {};
    if (fs.existsSync(filePath)) {
        try {
            langData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } catch (e) {
            langData = {};
        }
    }
    
    let added = 0;
    Object.keys(enData).forEach(key => {
        if (!langData[key]) {
            langData[key] = key;
            added++;
        }
    });
    
    fs.writeFileSync(filePath, JSON.stringify(langData, null, 2));
    if (added > 0) {
        console.log(`Synced ${added} keys to ${filePath}`);
    }
});
