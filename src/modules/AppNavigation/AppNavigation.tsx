import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import linking from './Linking'
import Authentication from './Authentication/Authentication'
import Home from './Home/Home'

const Stack = createStackNavigator()

const AppNavigation = () => {
  const isAuthenticated = true;

  return (
    <NavigationContainer linking={linking}>
      {isAuthenticated && <Home />}
      {!isAuthenticated && <Authentication />}
    </NavigationContainer>
  );
}

export default AppNavigation
