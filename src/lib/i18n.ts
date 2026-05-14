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

import hubEn from '../features/pride/hub/i18n/en.json';
import hubEs from '../features/pride/hub/i18n/es.json';
import hubHi from '../features/pride/hub/i18n/hi.json';

// Automatically load all translation files using Vite's glob import
const hubModules = import.meta.glob('../features/pride/hub/i18n/*.json', { eager: true });
const trackerModules = import.meta.glob('../features/pride/trackers/i18n/*.json', { eager: true });

console.log("[i18n] Glob detected hub files:", Object.keys(hubModules).length);
console.log("[i18n] Glob detected tracker files:", Object.keys(trackerModules).length);

const resources: any = {
  en: { hub: hubEn, tips: {}, guides: {}, trackers: {}, minis: {} },
  es: { hub: hubEs, tips: {}, guides: {}, trackers: {}, minis: {} },
  hi: { hub: hubHi, tips: {}, guides: {}, trackers: {}, minis: {} }
};

SUPPORTED_LANGUAGES.forEach((lang) => {
  if (!resources[lang]) {
    resources[lang] = {
      hub: {},
      tips: {},
      guides: {},
      trackers: {},
      minis: {}
    };
  }

  // Map hub-related files
  Object.entries(hubModules).forEach(([path, module]: [string, any]) => {
    const fileName = path.split(/[\\/]/).pop() || '';
    const content = module.default || module;
    
    if (fileName === `${lang}.json`) {
      resources[lang].hub = content;
    } else if (fileName === `tips.${lang}.json`) {
      resources[lang].tips = content;
    } else if (fileName === `guides.${lang}.json`) {
      resources[lang].guides = content;
    } else if (fileName === `minis.${lang}.json`) {
      resources[lang].minis = content;
    }
  });

  // Map tracker files
  Object.entries(trackerModules).forEach(([path, module]: [string, any]) => {
    const fileName = path.split('/').pop() || '';
    const content = module.default || module;
    if (fileName === `${lang}.json`) {
      resources[lang].trackers = content;
    }
  });
});

const detectedLang = getLanguageFromUrl();
console.log("[i18n] Detected language:", detectedLang);
console.log("[i18n] Hub keys for detected lang:", Object.keys(resources[detectedLang]?.hub || {}).length);

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
      useSuspense: false // Disable suspense globally to prevent blank screens
    }
  });

export default i18n;
