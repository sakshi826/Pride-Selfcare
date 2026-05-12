// i18n configuration - Modular internationalization for PrideMantra platform
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';

export const SUPPORTED_LANGUAGES = [
  'en', 'es', 'fr', 'de', 'pt', 'ru',
  'zh-Hans', 'zh-Hant', 'ja', 'ko',
  'ar', 'hi', 'bn', 'id', 'tr', 'vi',
  'it', 'pl', 'th', 'tl', 'nl', 'sv',
  'no', 'da', 'fi', 'cs', 'el', 'ro',
  'hu', 'uk', 'he', 'ms', 'ta', 'te', 'ur'
];

// Dynamically discover all i18n JSON files in the features directory
const locales = import.meta.glob('../features/pride/*/i18n/*.json');

i18n
  .use(LanguageDetector)
  .use(resourcesToBackend((language, namespace) => {
    const globKeys = Object.keys(locales);
    
    // Look for a key that contains BOTH the namespace and the language
    // This works in dev (../features/pride/hub/i18n/en.json) 
    // and production (assets/hub-i18n-en-XXXX.js)
    const match = globKeys.find(key => 
      key.includes(`/${namespace}/`) && key.includes(`/${language}.`)
    );
    
    if (match) {
      return locales[match]();
    }
    
    // Fallback to English if the specific language isn't found
    if (language !== 'en') {
      const fallbackMatch = globKeys.find(key => 
        key.includes(`/${namespace}/`) && key.includes(`/en.`)
      );
      if (fallbackMatch) return fallbackMatch();
    }

    return Promise.reject(`Locale not found for ${namespace}/${language}`);
  }))
  .use(initReactI18next)
  .init({
    debug: true, 
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGUAGES,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'path', 'subdomain'],
      lookupQuerystring: 'lang',
      caches: ['localStorage', 'cookie'],
    },
    ns: ['hub', 'common'], // Register default namespaces
    defaultNS: 'common',
    react: {
      useSuspense: true,
    }
  });

export default i18n;
