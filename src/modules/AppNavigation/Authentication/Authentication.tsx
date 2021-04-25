import { createStackNavigator } from '@react-navigation/stack'
import ForgotPassword from 'modules/Auth/Screens/ForgotPassword/ForgotPassword'
import Landing from 'modules/Auth/Screens/Landing/Landing'
import Register from 'modules/Auth/Screens/Register/Register'
import RegisterWithEmail from 'modules/Auth/Screens/RegisterWithEmail/RegisterWithEmail'
import ResetPassword from 'modules/Auth/Screens/ResetPassword/ResetPassword'
import Login from 'modules/Login/Login'
import React from 'react'

const Stack = createStackNavigator()

const Authentication = () => (
  <Stack.Navigator headerMode={'none'}>
    <Stack.Screen name="Landing" component={Landing} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="RegisterWithEmail" component={RegisterWithEmail} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="ResetPassword" component={ResetPassword} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  </Stack.Navigator>
)

export default Authentication
