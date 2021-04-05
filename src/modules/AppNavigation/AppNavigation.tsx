import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import Authentication from './Authentication/Authentication'
import Home from './Home/Home'
import linking from './Linking'

const Stack = createStackNavigator()

const AppNavigation = () => {
  const isAuthenticated = true

  return (
    <NavigationContainer linking={linking}>
      {isAuthenticated && <Home />}
      {!isAuthenticated && <Authentication />}
    </NavigationContainer>
  )
}

export default AppNavigation
