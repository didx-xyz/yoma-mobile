import { BottomTabBarOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { DigitalCvIcon, CoursesIcon, ChallengesIcon, MarketplaceIcon } from 'assets/images'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { colors, Colors, FontFamily } from 'styles'
import fontStyles from 'styles/font.styles'
import { applyAlphaToHex } from 'styles/styles.utils'

import About from '../About'
import Challenges from '../Challenges'
import Courses from '../Courses'
import DigitalCv from '../DigitalCv'
import Education from '../Education'
import Experience from '../Experience'
import Marketplace from '../Marketplace'
import Profile from '../Profile'
import { NavigationRoutes } from './Home.routes'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const tabBarOptions: BottomTabBarOptions = {
  tabStyle: {
    backgroundColor: colors[Colors.primaryPurple],
    paddingBottom: 2,
  },
  activeTintColor: colors[Colors.white],
  inactiveTintColor: applyAlphaToHex(colors[Colors.white])(0.38),
  labelStyle: {
    fontFamily: fontStyles[FontFamily.semibold],
  },
}

const HomeTabs = () => {
  const { t } = useTranslation()
  return (
    <Tab.Navigator tabBarOptions={tabBarOptions}>
      <Tab.Screen
        name="DigitalCv"
        component={DigitalCv}
        options={{
          title: t('myCv'),
          tabBarIcon: tabInfo => <DigitalCvIcon fill={tabInfo.color} />,
        }}
      />
      <Tab.Screen
        name="Courses"
        component={Courses}
        options={{
          title: t('courses'),
          tabBarIcon: tabInfo => <CoursesIcon fill={tabInfo.color} />,
        }}
      />
      <Tab.Screen
        name="Challenges"
        component={Challenges}
        options={{
          title: t('challenges'),
          tabBarIcon: tabInfo => <ChallengesIcon fill={tabInfo.color} />,
        }}
      />
      <Tab.Screen
        name="Marketplace"
        component={Marketplace}
        options={{
          title: t('marketplace'),
          tabBarIcon: tabInfo => <MarketplaceIcon fill={tabInfo.color} />,
        }}
      />
    </Tab.Navigator>
  )
}

const Home = () => {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name={NavigationRoutes.Home} component={HomeTabs} />
      <Stack.Screen name={NavigationRoutes.Profile} component={Profile} />
      <Stack.Screen name={NavigationRoutes.DigitalCv} component={DigitalCv} />
      <Stack.Screen name={NavigationRoutes.About} component={About} />
      <Stack.Screen name={NavigationRoutes.Experience} component={Experience} />
      <Stack.Screen name={NavigationRoutes.Education} component={Education} />
    </Stack.Navigator>
  )
}

export default Home
