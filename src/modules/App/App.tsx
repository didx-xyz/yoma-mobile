import { RNLocalize, setI18nConfig } from 'locales/i18n'
import React, { useEffect } from 'react'
import FlashMessage from 'react-native-flash-message'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from 'redux/store'

import AppNavigation from '../Navigation/Navigation.container'

setI18nConfig()

const App = () => {
  useEffect(() => {
    RNLocalize.addEventListener('change', setI18nConfig)
    return () => {
      RNLocalize.removeEventListener('change', setI18nConfig)
    }
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigation />
        <FlashMessage position="top" />
      </PersistGate>
    </Provider>
  )
}

export default App
