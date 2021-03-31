import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import linking from './Linking'

import DigitalCv from '../DigitalCv/DigitalCv'
import Earn from '../Earn/Earn'
import ForgotPassword from '../ForgotPassword/ForgotPassword'
import Home from '../Home/Home'
import Landing from '../Landing/Landing'
import Login from '../Login/Login'
import Onboarding from '../Onboarding/Onboarding'
import Opportunities from '../Opportunities/Opportunities'
import Profile from '../Profile/Profile'
import Register from '../Register/Register'
import RegisterWithEmail from '../RegisterWithEmail/RegisterWithEmail'
import ResetPassword from '../ResetPassword/ResetPassword'

const Stack = createStackNavigator()

const AppNavigation = () => (
  <NavigationContainer linking={linking}>
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="RegisterWithEmail" component={RegisterWithEmail} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Digital CV" component={DigitalCv} />
      <Stack.Screen name="Earn" component={Earn} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Opportunities" component={Opportunities} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  </NavigationContainer>
)

export default AppNavigation
