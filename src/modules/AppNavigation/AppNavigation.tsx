import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import { navigationRef } from '../AppNavigation/AppNavigation.actions'
import Home from '../Home/Home'
import Authentication from './Authentication/Authentication'
import linking from './Linking'

const Stack = createStackNavigator()

const AppNavigation = () => {
  const isAuthenticated = false

  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <Stack.Navigator headerMode="none">
        {isAuthenticated ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <Stack.Screen name="Authentication" component={Authentication} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation
