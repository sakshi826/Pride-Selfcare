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

// Read lang directly from URL query param — always reliable, no cache issues
function getLanguageFromUrl(): string {
  if (typeof window === 'undefined') return 'en';
  const params = new URLSearchParams(window.location.search);
  const lang = params.get('lang');
  if (lang && SUPPORTED_LANGUAGES.includes(lang)) return lang;
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

  // Map hub-related files (hub, tips, guides)
  // File naming convention: [namespace].[lang].json or [lang].json (defaults to hub)
  Object.entries(hubModules).forEach(([path, module]: [string, any]) => {
    const fileName = path.split('/').pop() || '';
    if (fileName.includes(`${lang}.json`)) {
      if (fileName.startsWith('tips.')) resources[lang].tips = module.default;
      else if (fileName.startsWith('guides.')) resources[lang].guides = module.default;
      else if (fileName === `${lang}.json`) resources[lang].hub = module.default;
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
    ns: ['hub', 'tips', 'guides', 'trackers'],
    defaultNS: 'hub',
  });

export default i18n;
