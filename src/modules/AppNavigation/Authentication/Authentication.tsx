import { createStackNavigator } from '@react-navigation/stack'
import ForgotPassword from 'modules/ForgotPassword/ForgotPassword'
import Landing from 'modules/Landing/Landing'
import Login from 'modules/Login'
import Register from 'modules/Register/Register'
import RegisterWithEmail from 'modules/RegisterWithEmail'
import ResetPassword from 'modules/ResetPassword/ResetPassword'
import React from 'react'

import { NavigationRoutes } from './Authentication.routes'

const Stack = createStackNavigator()

const Authentication = () => (
  <Stack.Navigator headerMode={'none'}>
    <Stack.Screen name={NavigationRoutes.Landing} component={Landing} />
    <Stack.Screen name={NavigationRoutes.Register} component={Register} />
    <Stack.Screen name={NavigationRoutes.RegisterWithEmail} component={RegisterWithEmail} />
    <Stack.Screen name={NavigationRoutes.Login} component={Login} />
    <Stack.Screen name={NavigationRoutes.ForgotPassword} component={ForgotPassword} />
    <Stack.Screen name={NavigationRoutes.ResetPassword} component={ResetPassword} />
  </Stack.Navigator>
)

export default Authentication
