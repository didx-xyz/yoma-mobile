import React, { useEffect } from 'react'
import FlashMessage from 'react-native-flash-message'

import { RNLocalize, setI18nConfig } from '~/locales/i18n'
import Sentry from '~/monitoring'

import Navigation from '../Navigation'

setI18nConfig()

const App = () => {
  useEffect(() => {
    RNLocalize.addEventListener('change', setI18nConfig)
    return () => {
      RNLocalize.removeEventListener('change', setI18nConfig)
    }
  }, [])

  return (
    <>
      <Navigation />
      <FlashMessage position="top" />
    </>
  )
}
export default Sentry.wrap(App)
