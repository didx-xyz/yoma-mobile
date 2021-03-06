import i18n from 'i18next'
import 'intl-pluralrules'
import { initReactI18next } from 'react-i18next'
import * as RNLocalize from 'react-native-localize'

const translationGetters = {
  en: require('./en-US.json'),
  pt: require('./pt-BR.json'),
  fr: require('./fr-FR.json'),
}

interface ISetI18nConfig {
  languageTag: string
  isRTL: boolean
}

export const setI18nConfig = () => {
  const fallback: ISetI18nConfig = { languageTag: 'en', isRTL: false }
  const { languageTag } = RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) || fallback
  i18n.use(initReactI18next).init({
    resources: translationGetters,
    lng: languageTag,
    // allow keys to be phrases having `:`, `.`
    nsSeparator: false,
    keySeparator: false,
    // do not load a fallback
    // fallbackLng: false,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  })
}

export { RNLocalize }
