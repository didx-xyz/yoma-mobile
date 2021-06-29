import { RNLocalize, setI18nConfig } from 'locales/i18n'
import React, { useEffect } from 'react'
import FlashMessage from 'react-native-flash-message'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from 'redux/store'

import Navigation from '../Navigation'

setI18nConfig()

interface Props {
  isAuthorised: boolean
}

const App = ({ isAuthorised }: Props) => {
  useEffect(() => {
    RNLocalize.addEventListener('change', setI18nConfig)
    return () => {
      RNLocalize.removeEventListener('change', setI18nConfig)
    }
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation isAuthorised={isAuthorised} />
        <FlashMessage position="top" />
      </PersistGate>
    </Provider>
  )
}

export default App
