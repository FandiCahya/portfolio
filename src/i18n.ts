import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './locales/en.json';
import idTranslations from './locales/id.json';
import { getContent } from './utils/contentStore';
import { getLangFromPath } from './utils/seo';

const resources = {
  en: {
    translation: getContent('en') || enTranslations,
  },
  id: {
    translation: getContent('id') || idTranslations,
  },
};

const pathLang = typeof window !== 'undefined' ? getLangFromPath(window.location.pathname) : null;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: pathLang || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;