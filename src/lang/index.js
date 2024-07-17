import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import vi from './translations/vi.json'
import en from './translations/en.json'

const resources = {
  en: {translation: en},
  vi: {translation: vi}
};

const lng = 'vi';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng,
  interpolation: {
    escapeValue: false
  }
})

export default i18n;
