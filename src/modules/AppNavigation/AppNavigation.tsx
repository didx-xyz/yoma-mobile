import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AuthCredentialsResponse } from 'modules/Auth/Auth.types'
import React from 'react'
import { useSelector } from 'react-redux'

import Home from '../Home/Home'
import Authentication from './Authentication/Authentication'
import linking from './Linking'

interface AuthState {
  auth: AuthCredentialsResponse
}
const Stack = createStackNavigator()

const AppNavigation = () => {
  const { token } = useSelector((state: AuthState) => state.auth)
  const isAuthenticated = token != ''

  return (
    <NavigationContainer linking={linking}>
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
