import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './locales/en.json';
import idTranslations from './locales/id.json';
import { getContent } from './utils/contentStore';

const resources = {
  en: {
    translation: getContent('en') || enTranslations,
  },
  id: {
    translation: getContent('id') || idTranslations,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;