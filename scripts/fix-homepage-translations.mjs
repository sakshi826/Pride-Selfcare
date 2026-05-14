import fs from 'fs';
import path from 'path';

const esPath = 'src/features/pride/hub/i18n/es.json';
const hiPath = 'src/features/pride/hub/i18n/hi.json';

const essentialTranslations = {
  "Assessments": { "es": "Evaluaciones", "hi": "मूल्यांकन" },
  "Stories": { "es": "Historias", "hi": "कहानियाँ" },
  "Identity Exploration": { "es": "Exploración de identidad", "hi": "पहचान की खोज" },
  "Tips": { "es": "Consejos", "hi": "सुझाव" },
  "Myths & Facts": { "es": "Mitos y realidades", "hi": "मिथक और तथ्य" },
  "Articles": { "es": "Artículos", "hi": "लेख" },
  "Identity Journey": { "es": "Viaje de identidad", "hi": "पहचान की यात्रा" },
  "Daily Care": { "es": "Cuidado diario", "hi": "दैनिक देखभाल" },
  "Mood": { "es": "Estado de ánimo", "hi": "मनोदशा" },
  "Sleep": { "es": "Sueño", "hi": "नींद" },
  "Gratitude": { "es": "Gratitud", "hi": "कृतज्ञता" },
  "Vibe": { "es": "Vibración", "hi": "वाइब" },
  "Lesbian": { "es": "Lesbiana", "hi": "लेस्बियन" },
  "Gay": { "es": "Gay", "hi": "गे" },
  "Bi-sexual": { "es": "Bisexual", "hi": "बाइसेक्सुअल" },
  "Trans": { "es": "Trans", "hi": "ट्रांस" },
  "Interactive Tools": { "es": "Herramientas interactivas", "hi": "इंटरैक्टिव टूल" },
  "Celebrate your Identity": { "es": "Celebra tu identidad", "hi": "अपनी पहचान का जश्न मनाएं" },
  "Confidence Mirror": { "es": "Espejo de confianza", "hi": "आत्मविश्वास का दर्पण" },
  "Masculinity on your own terms": { "es": "Masculinidad a tu manera", "hi": "अपनी शर्तों पर मर्दानगी" },
  "Coming out": { "es": "Saliendo del armario", "hi": "बाहर आना" },
  "Handle Reactions of Others": { "es": "Manejar reacciones ajenas", "hi": "दूसरों की प्रतिक्रियाओं को संभालना" },
  "Dealing with Homophobia": { "es": "Afrontar la homofobia", "hi": "होमोफोबिया से निपटना" }
};

function updateJson(filePath, lang) {
    if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        Object.keys(essentialTranslations).forEach(key => {
            if (!data[key] || data[key] === key) {
                data[key] = essentialTranslations[key][lang];
            }
        });
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`Updated ${filePath}`);
    }
}

updateJson(esPath, 'es');
updateJson(hiPath, 'hi');

// Also update guides namespace
const esGuidesPath = 'src/features/pride/hub/i18n/guides.es.json';
const hiGuidesPath = 'src/features/pride/hub/i18n/guides.hi.json';
updateJson(esGuidesPath, 'es');
updateJson(hiGuidesPath, 'hi');
