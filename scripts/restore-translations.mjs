import fs from 'fs';
import path from 'path';

const baseDir = 'src/features/pride/hub/i18n';
const languages = ['pt', 'ru', 'zh-Hans', 'zh-Hant'];

// Basic hub keys to at least show something translated
const basicTranslations = {
    "pt": {
        "Assessments": "Avaliações",
        "Guides": "Guias",
        "Stories": "Histórias",
        "Trackers": "Rastreadores",
        "LGBTQ+": "LGBTQ+",
        "Self-Care": "Autocuidado",
        "Resources": "Recursos",
        "Identity Exploration": "Exploração de Identidade"
    },
    "ru": {
        "Assessments": "Оценки",
        "Guides": "Руководства",
        "Stories": "Истории",
        "Trackers": "Трекеры",
        "LGBTQ+": "ЛГБТК+",
        "Self-Care": "Самопомощь",
        "Resources": "Ресурсы",
        "Identity Exploration": "Исследование идентичности"
    },
    "zh-Hans": {
        "Assessments": "评估",
        "Guides": "指南",
        "Stories": "故事",
        "Trackers": "追踪器",
        "LGBTQ+": "LGBTQ+",
        "Self-Care": "自我关怀",
        "Resources": "资源",
        "Identity Exploration": "身份探索"
    },
    "zh-Hant": {
        "Assessments": "評估",
        "Guides": "指南",
        "Stories": "故事",
        "Trackers": "追蹤器",
        "LGBTQ+": "LGBTQ+",
        "Self-Care": "自我關懷",
        "Resources": "資源",
        "Identity Exploration": "身份探索"
    }
};

languages.forEach(lang => {
    const filePath = path.join(baseDir, `${lang}.json`);
    const content = basicTranslations[lang];
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    console.log(`Restored ${filePath}`);
});
