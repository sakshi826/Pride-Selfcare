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

i18n
  .use(LanguageDetector)
  .use(resourcesToBackend((language, namespace) => {
    // Vite's built-in dynamic import support for variable paths
    return import(`../features/pride/${namespace}/i18n/${language}.json`)
      .catch(err => {
        console.error(`[i18n] Failed to load ${namespace}/${language}:`, err);
        // Fallback to English if the specific language fails
        if (language !== 'en') {
          return import(`../features/pride/${namespace}/i18n/en.json`);
        }
        throw err;
      });
  }))
  .use(initReactI18next)
  .init({
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
