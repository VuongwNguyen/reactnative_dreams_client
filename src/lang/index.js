import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';

import vi from './translations/vi.json';
import en from './translations/en.json';

const resources = {
  en: { translation: en },
  vi: { translation: vi },
};

// Thiết lập ngôn ngữ mặc định
export const lng = I18nManager.isRTL ? 'en' : 'vi';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng, // Sử dụng ngôn ngữ mặc định
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;