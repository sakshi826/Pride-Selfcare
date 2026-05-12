// i18n configuration - Modular internationalization for PrideMantra platform
// API key (VITE_GOOGLE_TRANSLATION_API_KEY) is used ONLY in scripts/translate.mjs at build time.
// It is never bundled into this file or exposed to the browser.
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

export const SUPPORTED_LANGUAGES = [
  'en', 'es', 'fr', 'de', 'pt', 'ru',
  'zh-Hans', 'zh-Hant', 'ja', 'ko',
  'ar', 'hi', 'bn', 'id', 'tr', 'vi',
  'it', 'pl', 'th', 'tl', 'nl', 'sv',
  'no', 'da', 'fi', 'cs', 'el', 'ro',
  'hu', 'uk', 'he', 'ms', 'ta', 'te', 'ur'
];

// Always read the `lang` URL param directly — this is the most reliable method.
// It avoids stale caches in localStorage or cookies overriding the URL intent.
function getLanguageFromUrl(): string {
  if (typeof window === 'undefined') return 'en';
  const params = new URLSearchParams(window.location.search);
  const lang = params.get('lang');
  if (lang && SUPPORTED_LANGUAGES.includes(lang)) {
    return lang;
  }
  return 'en';
}

const detectedLang = getLanguageFromUrl();

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: detectedLang,            // Explicitly set language from URL — no detector ambiguity
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGUAGES,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/pride/locales/{{lng}}/{{ns}}.json',
    },
    ns: ['hub', 'common'],
    defaultNS: 'common',
    react: {
      useSuspense: true,
    }
  });

export default i18n;
