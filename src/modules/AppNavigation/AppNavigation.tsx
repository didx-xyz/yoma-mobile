import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import DigitalCv from '../DigitalCv/DigitalCv'
import Earn from '../Earn/Earn'
import Home from '../Home/Home'
import Onboarding from '../Onboarding/Onboarding'
import Opportunities from '../Opportunities/Opportunities'
import Profile from '../Profile/Profile'

const Stack = createStackNavigator()

const AppNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator>
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
