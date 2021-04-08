import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import Authentication from './Authentication/Authentication'
import DigitalCv from './DigitalCv/DigitalCv'
import linking from './Linking'

const Stack = createStackNavigator()

const AppNavigation = () => {
  const isAuthenticated = false

  return (
    <NavigationContainer linking={linking}>
      {isAuthenticated && <DigitalCv />}
      {!isAuthenticated && <Authentication />}
    </NavigationContainer>
  )
}

export default AppNavigation
