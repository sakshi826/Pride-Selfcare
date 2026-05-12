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
    // Vite glob keys are relative to this file. 
    // We search for a match in the glob keys to be safe across different build environments.
    const globKeys = Object.keys(locales);
    const targetPathPart = `${namespace}/i18n/${language}.json`;
    const match = globKeys.find(key => key.endsWith(targetPathPart));
    
    if (match) {
      return locales[match]();
    }
    
    // Fallback for English
    if (language !== 'en') {
      const fallbackPart = `${namespace}/i18n/en.json`;
      const fallbackMatch = globKeys.find(key => key.endsWith(fallbackPart));
      if (fallbackMatch) {
        return locales[fallbackMatch]();
      }
    }

    console.warn(`[i18n] No match found for namespace: ${namespace}, language: ${language}`);
    return Promise.reject(`Locale file not found: ${targetPathPart}`);
  }))
  .use(initReactI18next)
  .init({
    debug: true, // Enable debug for console logs
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
