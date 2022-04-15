import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import HomeNavigation from '../HomeNavigation'
import Landing from '../Landing'
import linking from './Linking'
import { navigationRef } from './Navigation.utils'

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
        <Stack.Screen name="Landing" component={Landing} />
      )}
    </Stack.Navigator>
  </NavigationContainer>
)

export default Navigation
