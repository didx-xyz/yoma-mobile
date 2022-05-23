import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ChallengesIcon, CoursesIcon, DigitalCvIcon, MarketplaceIcon } from '~/assets/images'
import { Colors, FontFamily, colors } from '~/styles'
import fontStyles from '~/styles/font.styles'
import { applyAlphaToHex } from '~/styles/styles.utils'

import About from '../About'
import Challenges from '../Challenges'
import CompletedChallenges, { CompletedChallengesForm } from '../CompletedChallenges'
import Courses from '../Courses'
import Education, { EducationForm } from '../Education'
import Experience, { ExperienceForm } from '../Experience'
import Marketplace from '../Marketplace'
import MyCv from '../MyCv'
import MySkills, { MySkillsForm } from '../MySkills'
import Profile from '../Profile'
import { HomeNavigationRoutes, HomeTabRoutes } from './HomeNavigation.types'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const screenOptions = {
  headerShown: false,
  tabBarItemStyle: {
    backgroundColor: colors[Colors.PrimaryPurple],
    paddingBottom: 2,
  },
  tabBarActiveTintColor: colors[Colors.White],
  tabBarInactiveTintColor: applyAlphaToHex(colors[Colors.White])(0.38),
  tabBarLabelStyle: {
    fontFamily: fontStyles[FontFamily.Semibold],
  },
}

const HomeTabs = () => {
  const { t } = useTranslation()
  return (
    <Tab.Navigator screenOptions={screenOptions}>
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

const HomeNavigation = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={HomeNavigationRoutes.Home} component={HomeTabs} />
    <Stack.Screen name={HomeNavigationRoutes.Profile} component={Profile} />
    <Stack.Screen name={HomeNavigationRoutes.MyCv} component={MyCv} />
    <Stack.Screen name={HomeNavigationRoutes.About} component={About} />
    <Stack.Screen name={HomeNavigationRoutes.Experience} component={Experience} />
    <Stack.Screen name={HomeNavigationRoutes.ExperienceForm} component={ExperienceForm} />
    <Stack.Screen name={HomeNavigationRoutes.Education} component={Education} />
    <Stack.Screen name={HomeNavigationRoutes.EducationForm} component={EducationForm} />
    <Stack.Screen name={HomeNavigationRoutes.MySkills} component={MySkills} />
    <Stack.Screen name={HomeNavigationRoutes.MySkillsForm} component={MySkillsForm} />
    <Stack.Screen name={HomeNavigationRoutes.CompletedChallenges} component={CompletedChallenges} />
    <Stack.Screen name={HomeNavigationRoutes.CompletedChallengesForm} component={CompletedChallengesForm} />
  </Stack.Navigator>
)

export default HomeNavigation
