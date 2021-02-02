import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import EN from './locate/en/translate.json';
import FI from './locate/fi/translate.json';

const language = localStorage.getItem('language');

i18n
.use(initReactI18next)
.init({
  resources: {
    en: EN,
    fi: FI
  },
  lng: language ? language : "en",
  fallbackLng: "en",
  debug: true,
  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: ".",
  interpolation: {
    escapeValue: false,
    formatSeparator: ","
  },
  react: {
    wait: true,
    bindI18n: 'languageChanged loaded',
    bindStore: 'added removed',
    nsMode: 'default'
  }
});

export default i18n;