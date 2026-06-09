import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import pt from './locales/pt.json';
import ar from './locales/ar.json';
import hi from './locales/hi.json';
import zh from './locales/zh.json';
import id from './locales/id.json';
import ru from './locales/ru.json';

export const LANGUAGES = [
  {code: 'en', label: 'English', rtl: false},
  {code: 'es', label: 'Español', rtl: false},
  {code: 'fr', label: 'Français', rtl: false},
  {code: 'de', label: 'Deutsch', rtl: false},
  {code: 'pt', label: 'Português', rtl: false},
  {code: 'ar', label: 'العربية', rtl: true},
  {code: 'hi', label: 'हिन्दी', rtl: false},
  {code: 'zh', label: '中文', rtl: false},
  {code: 'id', label: 'Bahasa Indonesia', rtl: false},
  {code: 'ru', label: 'Русский', rtl: false},
] as const;

export const resources = {
  en: {translation: en},
  es: {translation: es},
  fr: {translation: fr},
  de: {translation: de},
  pt: {translation: pt},
  ar: {translation: ar},
  hi: {translation: hi},
  zh: {translation: zh},
  id: {translation: id},
  ru: {translation: ru},
} as const;

const SUPPORTED = LANGUAGES.map((l) => l.code);

/** Resolve the best initial language from device settings. */
export function getDeviceLanguage(): string {
  const best = RNLocalize.findBestLanguageTag(SUPPORTED);
  return best?.languageTag?.split('-')[0] ?? 'en';
}

export function initI18n(initialLang?: string) {
  if (i18n.isInitialized) {
    return i18n;
  }
  i18n.use(initReactI18next).init({
    resources,
    lng: initialLang ?? getDeviceLanguage(),
    fallbackLng: 'en',
    interpolation: {escapeValue: false},
    returnNull: false,
  });
  return i18n;
}

export default i18n;
