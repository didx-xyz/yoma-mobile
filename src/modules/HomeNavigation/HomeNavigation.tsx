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
import MyChallenges from '../MyChallenges'
import MyCourses from '../MyCourses'
import Profile from '../Profile'
import Skills from '../Skills'
import { HomeNavigationRoutes } from './HomeNavigation.routes'

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

const HomeNavigation = () => {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name={HomeNavigationRoutes.Home} component={HomeTabs} />
      <Stack.Screen name={HomeNavigationRoutes.Profile} component={Profile} />
      <Stack.Screen name={HomeNavigationRoutes.DigitalCv} component={DigitalCv} />
      <Stack.Screen name={HomeNavigationRoutes.About} component={About} />
      <Stack.Screen name={HomeNavigationRoutes.Experience} component={Experience} />
      <Stack.Screen name={HomeNavigationRoutes.Education} component={Education} />
      <Stack.Screen name={HomeNavigationRoutes.Skills} component={Skills} />
      <Stack.Screen name={HomeNavigationRoutes.MyCourses} component={MyCourses} />
      <Stack.Screen name={HomeNavigationRoutes.MyChallenges} component={MyChallenges} />
    </Stack.Navigator>
  )
}

export default HomeNavigation
