import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './translations/english.json';
import esTranslations from './translations/spanish.json';
import ptTranslations from './translations/portuguese.json';

i18n.use(initReactI18next)
    .init({
        lng: 'es',
        fallbackLng: 'es',
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

export default i18n;