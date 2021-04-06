import { createStackNavigator } from '@react-navigation/stack'
import DigitalCvHome from 'modules/DigitalCv/DigitalCvHome'
import Profile from 'modules/Profile/Profile'
import React from 'react'

const Stack = createStackNavigator()

const DigitalCv = () => (
  <Stack.Navigator headerMode={'none'}>
    <Stack.Screen name="DigitalCvHome" component={DigitalCvHome} />
  </Stack.Navigator>
)

export default DigitalCv
