import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import { navigationRef } from '../AppNavigation/AppNavigation.actions'
import Home from '../Home/Home'
import Authentication from './Authentication/Authentication'
import linking from './Linking'

const Stack = createStackNavigator()

type Props = {
  isAuthorised: boolean
}

const AppNavigation = ({ isAuthorised }: Props) => {
  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <Stack.Navigator headerMode="none">
        {isAuthorised ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <Stack.Screen name="Authentication" component={Authentication} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation
