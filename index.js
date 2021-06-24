import React from 'react'
import { AppRegistry } from 'react-native'
import 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { config } from './config'
import App from './src/modules/App'
import { store } from './src/redux/store'

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent(config.application.name, () => Root)
