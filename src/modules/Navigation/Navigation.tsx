import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import { LandingNavigationRoutes } from '~/modules/Landing/Landing.types'
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
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={LandingNavigationRoutes.Authentication}>
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
