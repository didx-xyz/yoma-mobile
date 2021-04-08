import { RNLocalize, setI18nConfig } from 'locales/i18n'
import React, { useEffect } from 'react'
import FlashMessage from 'react-native-flash-message'

import AppNavigation from '../AppNavigation'

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
      <AppNavigation />
      <FlashMessage position="top" />
    </>
  )
}

export default App
