import { use } from 'i18next';
import { initReactI18next } from 'react-i18next';
import app from './containers/App/locales/vi.json';

const resources = {
  vi: {
    translation: {
      app: app,
    },
  },
};

use(initReactI18next).init({
  lng: 'vi', // if you're using a language detector, do not define the lng option
  debug: true,
  resources,
});
