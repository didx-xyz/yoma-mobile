import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AuthLoginSuccessResponse } from 'modules/Auth/Auth.types'
import React from 'react'

import Home from '../Home/Home'
import Authentication from './Authentication/Authentication'
import linking from './Linking'

interface AuthState {
  auth: AuthLoginSuccessResponse
}
const Stack = createStackNavigator()
type Props = {
  isAuthenticated: boolean
}
const AppNavigation = ({ isAuthenticated }: Props) => {
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
