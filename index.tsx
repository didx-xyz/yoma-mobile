import 'react-native-gesture-handler'
import React from 'react'
import { AppRegistry } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import App from './src/modules/App'
import { config } from './config'

const Root = () => (
  <NavigationContainer>
    <App />
  </NavigationContainer>
)

AppRegistry.registerComponent(config.application.name, () => Root)
