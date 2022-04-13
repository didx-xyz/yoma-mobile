import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import ForgotPassword from '~/modules/ForgotPassword/ForgotPassword'
import Landing from '~/modules/Landing'
import Register from '~/modules/Register'
import RegisterWithEmail from '~/modules/RegisterWithEmail'
import ResetPassword from '~/modules/ResetPassword/ResetPassword'

import { AuthNavigationRoutes } from './AuthNavigation.types'

const Stack = createStackNavigator()

const AuthNavigation = () => (
  <Stack.Navigator headerMode={'none'}>
    <Stack.Screen name={AuthNavigationRoutes.Landing} component={Landing} />
    <Stack.Screen name={AuthNavigationRoutes.Register} component={Register} />
    <Stack.Screen name={AuthNavigationRoutes.RegisterWithEmail} component={RegisterWithEmail} />
    <Stack.Screen name={AuthNavigationRoutes.ForgotPassword} component={ForgotPassword} />
    <Stack.Screen name={AuthNavigationRoutes.ResetPassword} component={ResetPassword} />
  </Stack.Navigator>
)

export default AuthNavigation
