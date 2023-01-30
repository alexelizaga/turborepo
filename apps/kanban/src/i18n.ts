import i18next from "i18next";
import { initReactI18next } from "react-i18next";

//Import all translation files
import authSpanish from '../public/locales/sp/auth.json';
import calendarSpanish from '../public/locales/sp/calendar.json';
import journalSpanish from '../public/locales/sp/journal.json';
import sharedSpanish from '../public/locales/sp/shared.json';

//---Using different namespaces
const resources = {
  en: {},
  es: {
    auth: authSpanish,
    calendar: calendarSpanish,
    journal: journalSpanish,
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