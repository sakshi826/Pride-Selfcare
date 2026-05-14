import fs from 'fs';
import path from 'path';

const enFile = 'src/features/pride/hub/i18n/minis.en.json';
const languages = ['es', 'hi'];

const enData = JSON.parse(fs.readFileSync(enFile, 'utf8'));

languages.forEach(lang => {
    const filePath = `src/features/pride/hub/i18n/minis.${lang}.json`;
    let langData = {};
    if (fs.existsSync(filePath)) {
        langData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    
    // Merge: keep existing translations, add new keys from EN
    let added = 0;
    Object.keys(enData).forEach(key => {
        if (!langData[key]) {
            langData[key] = key; // Fallback to English key
            added++;
        }
    });
    
    fs.writeFileSync(filePath, JSON.stringify(langData, null, 2));
    console.log(`Merged ${added} new keys into ${filePath}`);
});
