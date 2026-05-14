import fs from 'fs';
import path from 'path';

const SUPPORTED_LANGUAGES = ['hi', 'es', 'fr', 'de', 'pt', 'ru', 'zh-Hans', 'zh-Hant', 'ja', 'ko', 'ar', 'bn', 'id', 'tr', 'vi', 'it', 'pl', 'th', 'tl', 'nl', 'sv', 'no', 'da', 'fi', 'cs', 'el', 'ro', 'hu', 'uk', 'he', 'ms', 'ta', 'te', 'ur'];

const namespaces = [
    { base: 'src/features/pride/hub/i18n', en: 'en.json', prefix: '' },
    { base: 'src/features/pride/hub/i18n', en: 'tips.en.json', prefix: 'tips.' },
    { base: 'src/features/pride/hub/i18n', en: 'guides.en.json', prefix: 'guides.' },
    { base: 'src/features/pride/trackers/i18n', en: 'en.json', prefix: '' }
];

namespaces.forEach(ns => {
    const enPath = path.join(ns.base, ns.en);
    if (!fs.existsSync(enPath)) return;
    const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

    SUPPORTED_LANGUAGES.forEach(lang => {
        const filePath = path.join(ns.base, `${ns.prefix}${lang}.json`);
        let langData = {};
        if (fs.existsSync(filePath)) {
            try {
                const content = fs.readFileSync(filePath, 'utf8');
                langData = content.length > 2 ? JSON.parse(content) : {};
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
});
