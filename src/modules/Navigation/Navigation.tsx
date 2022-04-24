import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import HomeNavigation from '../HomeNavigation'
import Landing from '../Landing'
import linking from './Linking'
import { navigationRef } from './Navigation.utils'

const Stack = createNativeStackNavigator()

interface Props {
  isAuthorised: boolean
}

const Navigation = ({ isAuthorised }: Props) => (
  <NavigationContainer linking={linking} ref={navigationRef}>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthorised ? (
        <Stack.Screen name="Home" component={HomeNavigation} />
      ) : (
        <Stack.Screen name="Landing" component={Landing} />
      )}
    </Stack.Navigator>
  </NavigationContainer>
)

export default Navigation
