import React from 'react'
import { AppRegistry } from 'react-native'
import 'react-native-gesture-handler'
import { config } from './config'
import App from './src/modules/App'

const Root = () => (<App />)

AppRegistry.registerComponent(config.application.name, () => Root)
