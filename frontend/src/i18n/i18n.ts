import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: 'Welcome',
        login: 'Login',
        register: 'Register',
        home: 'Home',
        switchTheme: 'Switch to Dark',
        footer: '© 2024 MyApp. All rights reserved.',
      },
    },
    ru: {
      translation: {
        welcome: 'Добро пожаловать',
        login: 'Войти',
        register: 'Регистрация',
        home: 'Главная',
        switchTheme: 'Переключить на тёмную',
        footer: '© 2024 MyApp. Все права защищены.',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
