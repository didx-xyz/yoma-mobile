import { BottomTabBarOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ChallengesIcon, CoursesIcon, DigitalCvIcon, MarketplaceIcon } from '~/assets/images'
import { Colors, FontFamily, colors } from '~/styles'
import fontStyles from '~/styles/font.styles'
import { applyAlphaToHex } from '~/styles/styles.utils'

import About from '../About'
import Challenges from '../Challenges'
import CompletedChallenges from '../CompletedChallenges'
import CompletedCourses from '../CompletedCourses'
import Courses from '../Courses'
import Education from '../Education'
import Experience from '../Experience'
import Marketplace from '../Marketplace'
import MyCv from '../MyCv'
import MySkills from '../MySkills/MySkills'
import Profile from '../Profile'
import { HomeNavigationRoutes, HomeTabRoutes } from './HomeNavigation.types'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const tabBarOptions: BottomTabBarOptions = {
  tabStyle: {
    backgroundColor: colors[Colors.PrimaryPurple],
    paddingBottom: 2,
  },
  activeTintColor: colors[Colors.White],
  inactiveTintColor: applyAlphaToHex(colors[Colors.White])(0.38),
  labelStyle: {
    fontFamily: fontStyles[FontFamily.Semibold],
  },
}

const HomeTabs = () => {
  const { t } = useTranslation()
  return (
    <Tab.Navigator tabBarOptions={tabBarOptions}>
      <Tab.Screen
        name={HomeTabRoutes.MyCv}
        component={MyCv}
        options={{
          title: t('myCv'),
          tabBarIcon: tabInfo => <DigitalCvIcon fill={tabInfo.color} />,
        }}
      />
      <Tab.Screen
        name={HomeTabRoutes.Courses}
        component={Courses}
        options={{
          title: t('courses'),
          tabBarIcon: tabInfo => <CoursesIcon fill={tabInfo.color} />,
        }}
      />
      <Tab.Screen
        name={HomeTabRoutes.Challenges}
        component={Challenges}
        options={{
          title: t('challenges'),
          tabBarIcon: tabInfo => <ChallengesIcon fill={tabInfo.color} />,
        }}
      />
      <Tab.Screen
        name={HomeTabRoutes.MarketPlace}
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
      <Stack.Screen name={HomeNavigationRoutes.MyCv} component={MyCv} />
      <Stack.Screen name={HomeNavigationRoutes.About} component={About} />
      <Stack.Screen name={HomeNavigationRoutes.Experience} component={Experience} />
      <Stack.Screen name={HomeNavigationRoutes.Education} component={Education} />
      <Stack.Screen name={HomeNavigationRoutes.MySkills} component={MySkills} />
      <Stack.Screen name={HomeNavigationRoutes.CompletedCourses} component={CompletedCourses} />
      <Stack.Screen name={HomeNavigationRoutes.CompletedChallenges} component={CompletedChallenges} />
    </Stack.Navigator>
  )
}

export default HomeNavigation
