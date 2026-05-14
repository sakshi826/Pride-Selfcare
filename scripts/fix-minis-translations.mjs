import fs from 'fs';
import path from 'path';

const essentialMinis = {
  "Next": { "es": "Siguiente", "hi": "अगला" },
  "Finish ✨": { "es": "Terminar ✨", "hi": "समाप्त करें ✨" },
  "Back to Hub": { "es": "Volver al inicio", "hi": "हब पर वापस जाएं" },
  "of": { "es": "de", "hi": "का" },
  "The Reality": { "es": "La realidad", "hi": "वास्तविकता" },
  "Your Struggles Have a Context": { "es": "Tus luchas tienen un contexto", "hi": "आपके संघर्षों का एक संदर्भ है" },
  "These numbers are not meant to alarm you. They are meant to explain. If you have been struggling, there is a documented reason — and a documented path toward better.": { 
      "es": "Estas cifras no pretenden alarmarte, sino explicarte. Si has estado luchando, hay una razón documentada y un camino probado hacia la mejora.", 
      "hi": "इन आंकड़ों का उद्देश्य आपको डराना नहीं है। इनका उद्देश्य समझाना है। यदि आप संघर्ष कर रहे हैं, तो इसके पीछे एक प्रमाणित कारण है - और बेहतर होने का एक प्रमाणित मार्ग है।" 
  },
  "Conversation Guide": { "es": "Guía de conversación", "hi": "बातचीत मार्गदर्शिका" },
  "Back": { "es": "Atrás", "hi": "पीछे" },
  "Share This Guide": { "es": "Compartir esta guía", "hi": "इस गाइड को साझा करें" },
  "LGBTQ+ Stories": { "es": "Historias LGBTQ+", "hi": "LGBTQ+ कहानियाँ" },
  "Real journeys of finding yourself": { "es": "Verdaderos viajes de autodescubrimiento", "hi": "खुद को खोजने की वास्तविक यात्राएँ" },
  "LGBTQ+ Voices": { "es": "Voces LGBTQ+", "hi": "LGBTQ+ आवाज़ें" },
  "Real Stories of": { "es": "Historias reales de", "hi": "की वास्तविक कहानियाँ" },
  "Finding Yourself": { "es": "Encontrarse a uno mismo", "hi": "खुद को पाना" },
  "Nine people. Nine journeys. One truth — you are not alone, and who you are is worth celebrating.": {
      "es": "Nueve personas. Nueve viajes. Una verdad: no estás solo, y quien eres merece ser celebrado.",
      "hi": "नौ लोग। नौ यात्राएँ। एक सच - आप अकेले नहीं हैं, और आप जो हैं वह जश्न मनाने लायक है।"
  },
  "Coming out is not one moment. It's a thousand small brave ones.": {
      "es": "Salir del armario no es un solo momento. Son mil pequeños actos de valentía.",
      "hi": "बाहर आना कोई एक पल नहीं है। यह हज़ारों छोटे साहसी कदम हैं।"
  },
  "Read the Stories": { "es": "Leer las historias", "hi": "कहानियाँ पढ़ें" }
};

const languages = ['es', 'hi'];

languages.forEach(lang => {
    const filePath = `src/features/pride/hub/i18n/minis.${lang}.json`;
    let data = {};
    if (fs.existsSync(filePath)) {
        data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    
    Object.keys(essentialMinis).forEach(key => {
        data[key] = essentialMinis[key][lang];
    });
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated ${filePath}`);
});
