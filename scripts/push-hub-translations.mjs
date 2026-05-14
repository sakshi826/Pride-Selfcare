import fs from 'fs';
import path from 'path';

const hubKeys = {
  "Assessments": { "es": "Evaluaciones", "hi": "मूल्यांकन" },
  "Stories": { "es": "Historias", "hi": "कहानियां" },
  "Identity Exploration": { "es": "Exploración de Identidad", "hi": "पहचान की खोज" },
  "Tips": { "es": "Consejos", "hi": "सुझाव" },
  "Myths & Facts": { "es": "Mitos y Realidades", "hi": "मिथक और तथ्य" },
  "Articles": { "es": "Artículos", "hi": "लेख" },
  "Identity Journey": { "es": "Viaje de Identidad", "hi": "पहचान की यात्रा" },
  "Daily Care": { "es": "Cuidado Diario", "hi": "दैनिक देखभाल" },
  "Mood": { "es": "Estado de ánimo", "hi": "मनोदशा" },
  "Sleep": { "es": "Sueño", "hi": "नींद" },
  "Gratitude": { "es": "Gratitud", "hi": "कृतज्ञता" },
  "Vibe": { "es": "Vibración", "hi": "वाइब" },
  "Lesbian": { "es": "Lesbiana", "hi": "लेस्बियन" },
  "Gay": { "es": "Gay", "hi": "गे" },
  "Bi-sexual": { "es": "Bisexual", "hi": "उभयलिंगी" },
  "Trans": { "es": "Trans", "hi": "ट्रांस" },
  "LGBTQ+": { "es": "LGBTQ+", "hi": "LGBTQ+" },
  "Self-Care": { "es": "Autocuidado", "hi": "आत्म-देखभाल" },
  "Resources": { "es": "Recursos", "hi": "संसाधन" },
  "Essential tools and information": { "es": "Herramientas e información esenciales", "hi": "आवश्यक उपकरण और जानकारी" },
  "Trackers": { "es": "Rastreadores", "hi": "ट्रैकर्स" },
  "Monitor your wellness journey": { "es": "Monitorea tu progreso hacia el bienestar", "hi": "अपने कल्याण की यात्रा की निगरानी करें" },
  "Wellness Guides": { "es": "Guías de Bienestar", "hi": "कल्याण मार्गदर्शिकाएँ" },
  "Identity-specific support and resources": { "es": "Apoyo y recursos específicos por identidad", "hi": "पहचान-विशिष्ट समर्थन और संसाधन" }
};

const languages = ['es', 'hi'];

languages.forEach(lang => {
    const filePath = `src/features/pride/hub/i18n/${lang}.json`;
    let data = {};
    if (fs.existsSync(filePath)) {
        data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    
    Object.keys(hubKeys).forEach(key => {
        data[key] = hubKeys[key][lang];
    });
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Pushed critical hub keys to ${filePath}`);
});
