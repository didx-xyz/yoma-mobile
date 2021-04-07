import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import linking from './Linking'
import Authentication from './Authentication/Authentication'
import DigitalCv from './DigitalCv/DigitalCv'

const Stack = createStackNavigator()

const AppNavigation = () => {
  const isAuthenticated = false;

  return (
    <NavigationContainer linking={linking}>
      {isAuthenticated && <DigitalCv />}
      {!isAuthenticated && <Authentication />}
    </NavigationContainer>
  );
}

export default AppNavigation
