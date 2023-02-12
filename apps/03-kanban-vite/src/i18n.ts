import i18next from "i18next";
import { initReactI18next } from "react-i18next";

//Import all translation files
import authSpanish from '../public/locales/sp/auth.json';
import sharedSpanish from '../public/locales/sp/shared.json';

//---Using different namespaces
const resources = {
  en: {},
  es: {
    auth: authSpanish,
    shared: sharedSpanish
  },
};

i18next
.use(initReactI18next)
.init({
  resources,
  lng:"es", //default language
});

export default i18next;