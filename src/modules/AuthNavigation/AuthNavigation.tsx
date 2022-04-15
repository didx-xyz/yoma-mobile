import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import Landing from '~/modules/Landing'

import { AuthNavigationRoutes } from './AuthNavigation.types'

const Stack = createStackNavigator()

const AuthNavigation = () => (
  <Stack.Navigator headerMode={'none'}>
    <Stack.Screen name={AuthNavigationRoutes.Landing} component={Landing} />
  </Stack.Navigator>
)

export default AuthNavigation
