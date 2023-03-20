import * as i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as resources from './resources';
const i18nLanguage = localStorage.getItem('i18nLanguage') || 'en';
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    ...Object.entries(resources).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: {
          translation: value
        }
      }),
      {}
    )
  },
  fallbackLng: i18nLanguage /* vi , en */
});

export default i18n;
