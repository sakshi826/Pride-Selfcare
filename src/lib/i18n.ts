// i18n configuration - Modular internationalization for PrideMantra platform
// API key (VITE_GOOGLE_TRANSLATION_API_KEY) is used ONLY in scripts/translate.mjs at build time.
// It is never bundled into this file or exposed to the browser.
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import all hub translations statically — bundled with the app, no HTTP request needed.
// This is the most reliable approach for a production SPA.
import hub_ar from '../features/pride/hub/i18n/ar.json';
import hub_bn from '../features/pride/hub/i18n/bn.json';
import hub_cs from '../features/pride/hub/i18n/cs.json';
import hub_da from '../features/pride/hub/i18n/da.json';
import hub_de from '../features/pride/hub/i18n/de.json';
import hub_el from '../features/pride/hub/i18n/el.json';
import hub_en from '../features/pride/hub/i18n/en.json';
import hub_es from '../features/pride/hub/i18n/es.json';
import hub_fi from '../features/pride/hub/i18n/fi.json';
import hub_fr from '../features/pride/hub/i18n/fr.json';
import hub_he from '../features/pride/hub/i18n/he.json';
import hub_hi from '../features/pride/hub/i18n/hi.json';
import hub_hu from '../features/pride/hub/i18n/hu.json';
import hub_id from '../features/pride/hub/i18n/id.json';
import hub_it from '../features/pride/hub/i18n/it.json';
import hub_ja from '../features/pride/hub/i18n/ja.json';
import hub_ko from '../features/pride/hub/i18n/ko.json';
import hub_ms from '../features/pride/hub/i18n/ms.json';
import hub_nl from '../features/pride/hub/i18n/nl.json';
import hub_no from '../features/pride/hub/i18n/no.json';
import hub_pl from '../features/pride/hub/i18n/pl.json';
import hub_pt from '../features/pride/hub/i18n/pt.json';
import hub_ro from '../features/pride/hub/i18n/ro.json';
import hub_ru from '../features/pride/hub/i18n/ru.json';
import hub_sv from '../features/pride/hub/i18n/sv.json';
import hub_ta from '../features/pride/hub/i18n/ta.json';
import hub_te from '../features/pride/hub/i18n/te.json';
import hub_th from '../features/pride/hub/i18n/th.json';
import hub_tl from '../features/pride/hub/i18n/tl.json';
import hub_tr from '../features/pride/hub/i18n/tr.json';
import hub_uk from '../features/pride/hub/i18n/uk.json';
import hub_ur from '../features/pride/hub/i18n/ur.json';
import hub_vi from '../features/pride/hub/i18n/vi.json';
import hub_zh_Hans from '../features/pride/hub/i18n/zh-Hans.json';
import hub_zh_Hant from '../features/pride/hub/i18n/zh-Hant.json';

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

i18n
  .use(initReactI18next)
  .init({
    lng: getLanguageFromUrl(),
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    resources: {
      ar:       { hub: hub_ar },
      bn:       { hub: hub_bn },
      cs:       { hub: hub_cs },
      da:       { hub: hub_da },
      de:       { hub: hub_de },
      el:       { hub: hub_el },
      en:       { hub: hub_en },
      es:       { hub: hub_es },
      fi:       { hub: hub_fi },
      fr:       { hub: hub_fr },
      he:       { hub: hub_he },
      hi:       { hub: hub_hi },
      hu:       { hub: hub_hu },
      id:       { hub: hub_id },
      it:       { hub: hub_it },
      ja:       { hub: hub_ja },
      ko:       { hub: hub_ko },
      ms:       { hub: hub_ms },
      nl:       { hub: hub_nl },
      no:       { hub: hub_no },
      pl:       { hub: hub_pl },
      pt:       { hub: hub_pt },
      ro:       { hub: hub_ro },
      ru:       { hub: hub_ru },
      sv:       { hub: hub_sv },
      ta:       { hub: hub_ta },
      te:       { hub: hub_te },
      th:       { hub: hub_th },
      tl:       { hub: hub_tl },
      tr:       { hub: hub_tr },
      uk:       { hub: hub_uk },
      ur:       { hub: hub_ur },
      vi:       { hub: hub_vi },
      'zh-Hans':{ hub: hub_zh_Hans },
      'zh-Hant':{ hub: hub_zh_Hant },
    },
    ns: ['hub'],
    defaultNS: 'hub',
  });

export default i18n;
