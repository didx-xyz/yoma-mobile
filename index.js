import React from 'react'
import { AppRegistry } from 'react-native'
import 'react-native-gesture-handler'
import { config } from './config'
import App from './src/modules/App'
import { persistor, store } from '~/redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const Root = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </ PersistGate>
  </Provider>
)

AppRegistry.registerComponent(config.application.name, () => Root)
