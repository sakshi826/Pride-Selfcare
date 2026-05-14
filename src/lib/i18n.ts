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
  
  if (lang && SUPPORTED_LANGUAGES.includes(lang)) {
    localStorage.setItem('pride_lang', lang); // Save to local storage
    return lang;
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
// This avoids 140+ manual import statements
const hubModules = import.meta.glob('../features/pride/hub/i18n/*.json', { eager: true });
const trackerModules = import.meta.glob('../features/pride/trackers/i18n/*.json', { eager: true });

const resources: any = {};

SUPPORTED_LANGUAGES.forEach((lang) => {
  resources[lang] = {
    hub: {},
    tips: {},
    guides: {},
    trackers: {}
  };

  // Map hub-related files (hub, tips, guides, minis)
  // File naming convention: [namespace].[lang].json or [lang].json (defaults to hub)
  Object.entries(hubModules).forEach(([path, module]: [string, any]) => {
    const fileName = path.split('/').pop() || '';
    if (fileName.includes(`${lang}.json`)) {
      const parts = fileName.split('.');
      const ns = parts.length > 2 ? parts[0] : (fileName === `${lang}.json` ? 'hub' : parts[0]);
      resources[lang][ns] = module.default;
    }
  });

  // Map tracker files
  Object.entries(trackerModules).forEach(([path, module]: [string, any]) => {
    const fileName = path.split('/').pop() || '';
    if (fileName === `${lang}.json`) {
      resources[lang].trackers = module.default;
    }
  });
});

i18n
  .use(initReactI18next)
  .init({
    lng: getLanguageFromUrl(),
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    resources,
    ns: ['hub', 'tips', 'guides', 'trackers', 'minis'],
    defaultNS: 'hub',
  });

export default i18n;
