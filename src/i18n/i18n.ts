import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './translations/english.json';
import esTranslations from './translations/spanish.json';
import ptTranslations from './translations/portuguese.json';
import LanguageDetector from 'i18next-browser-languagedetector';


const storedLang = localStorage.getItem('language');
const initialLang = storedLang || 'es';

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng: initialLang,
        fallbackLng: 'es',
        debug: true,
        detection: {
            order: ['localStorage', 'navigator']
        },
        interpolation: {
            escapeValue: false
        },
        resources: {
            en: {
                translation: enTranslations
            },
            pt: {
                translation: ptTranslations

            },
            es: {
                translation: esTranslations
            },
        }
    })

i18n.on('languageChanged', (newLang) => {
    localStorage.setItem('language', newLang);
});

export default i18n;