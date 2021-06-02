import 'react-native-gesture-handler'
import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'
import { config } from './config'
import App from './src/modules/App'
import { store, persistor } from './src/redux/store'


const Root = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>
)

AppRegistry.registerComponent(config.application.name, () => Root)
