import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'

import { setupSentryNavigation } from '~/monitoring'

import HomeNavigation from '../HomeNavigation'
import Landing from '../Landing'
import linking from './Linking'
import { navigationRef } from './Navigation.utils'

const Stack = createNativeStackNavigator()

interface Props {
  isAuthorised: boolean
}

const Navigation = ({ isAuthorised }: Props) => {
  return (
    <NavigationContainer ref={navigationRef} onReady={setupSentryNavigation} linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthorised ? (
          <Stack.Screen name="Authed" component={HomeNavigation} />
        ) : (
          <Stack.Screen name="Landing" component={Landing} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default Navigation
