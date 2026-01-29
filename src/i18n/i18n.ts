import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: [], // Disable auto-caching to allow "Device default" mode
    },
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
});

// Set initial language
if (i18n.language) {
  document.documentElement.lang = i18n.language;
}

export default i18n;
