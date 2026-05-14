import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const SUPPORTED_LANGUAGES = [
  'en', 'es', 'fr', 'de', 'pt', 'ru',
  'zh-Hans', 'zh-Hant', 'ja', 'ko',
  'ar', 'hi', 'bn', 'id', 'tr', 'vi',
  'it', 'pl', 'th', 'tl', 'nl', 'sv',
  'no', 'da', 'fi', 'cs', 'el', 'ro',
  'hu', 'uk', 'he', 'ms', 'ta', 'te', 'ur'
];

function getLanguageFromUrl(): string {
  if (typeof window === 'undefined') return 'en';
  const params = new URLSearchParams(window.location.search);
  const lang = params.get('lang');
  
  if (lang) {
    const baseLang = lang.split('-')[0];
    if (SUPPORTED_LANGUAGES.includes(lang)) {
      localStorage.setItem('pride_lang', lang);
      return lang;
    }
    if (SUPPORTED_LANGUAGES.includes(baseLang)) {
      localStorage.setItem('pride_lang', baseLang);
      return baseLang;
    }
  }

  // Try localStorage
  const savedLang = localStorage.getItem('pride_lang');
  if (savedLang && SUPPORTED_LANGUAGES.includes(savedLang)) {
    return savedLang;
  }

  // Try to detect from pathname as fallback (e.g. /hi/...)
  const pathParts = window.location.pathname.split('/');
  const pathLang = pathParts.find(p => SUPPORTED_LANGUAGES.includes(p));
  if (pathLang) return pathLang;

  return 'en';
}

// Automatically load all translation files using Vite's glob import
const hubModules = import.meta.glob('../features/pride/hub/i18n/*.json', { eager: true });
const trackerModules = import.meta.glob('../features/pride/trackers/i18n/*.json', { eager: true });

const resources: any = {};

// Initialize resources for all supported languages
SUPPORTED_LANGUAGES.forEach(lang => {
  resources[lang] = { hub: {}, tips: {}, guides: {}, trackers: {}, minis: {} };
});

// Single pass over hub modules to populate resources
Object.entries(hubModules).forEach(([path, module]: [string, any]) => {
  const fileName = path.split(/[\\/]/).pop() || '';
  const content = module.default || module;
  
  // Extract namespace and language from fileName (e.g., "guides.es.json" or "es.json")
  const parts = fileName.replace('.json', '').split('.');
  let ns = 'hub';
  let lang = '';
  
  if (parts.length === 1) {
    lang = parts[0];
  } else {
    ns = parts[0];
    lang = parts[1];
  }

  if (resources[lang]) {
    resources[lang][ns] = content;
  }
});

// Map tracker files
Object.entries(trackerModules).forEach(([path, module]: [string, any]) => {
  const fileName = path.split(/[\\/]/).pop() || '';
  const lang = fileName.replace('.json', '');
  if (resources[lang]) {
    resources[lang].trackers = module.default || module;
  }
});

const detectedLang = getLanguageFromUrl();

i18n
  .use(initReactI18next)
  .init({
    lng: detectedLang,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    resources,
    ns: ['hub', 'tips', 'guides', 'trackers', 'minis'],
    defaultNS: 'hub',
    react: {
      useSuspense: false
    }
  });

export default i18n;
