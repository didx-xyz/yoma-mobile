import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import AuthNavigation from '../AuthNavigation'
import HomeNavigation from '../HomeNavigation'
import linking from './Linking'
import { navigationRef } from './Navigation.actions'

const Stack = createStackNavigator()

interface Props {
  isAuthorised: boolean
}

const Navigation = ({ isAuthorised }: Props) => (
  <NavigationContainer linking={linking} ref={navigationRef}>
    <Stack.Navigator headerMode="none">
      {isAuthorised ? (
        <Stack.Screen name="Home" component={HomeNavigation} />
      ) : (
        <Stack.Screen name="Authentication" component={AuthNavigation} />
      )}
    </Stack.Navigator>
  </NavigationContainer>
)

export default Navigation
