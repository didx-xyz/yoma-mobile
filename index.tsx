import 'react-native-gesture-handler
import React from 'react'
import {AppRegistry} from 'react-native';
import { NavigationContainer } from '@react-navigation/native

import App from './src/modules/App';
import {name as appName} from './app.json';

const Root = () => (
  <NavigationContainer>
    <App />
  </NavigationContainer>
)

AppRegistry.registerComponent(appName, () => Root);
