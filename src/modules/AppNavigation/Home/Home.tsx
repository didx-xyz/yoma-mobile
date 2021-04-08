import { BottomTabBarOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { DigitalCvIcon, CoursesIcon, ChallengesIcon, MarketplaceIcon } from 'assets/Images'
import About from 'modules/About/About'
import Challenges from 'modules/Challenges/Challenges'
import Courses from 'modules/Courses/Courses'
import DigitalCv from 'modules/DigitalCv/DigitalCv'
import DigitalCvHome from 'modules/DigitalCv/DigitalCv'
import Experience from 'modules/Experience/Experience'
import Marketplace from 'modules/Marketplace/Marketplace'
import Profile from 'modules/Profile/Profile'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { colors, Colors, FontFamily } from 'styles'
import fontStyles from 'styles/font.styles'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const tabBarOptions: BottomTabBarOptions = {
  tabStyle: {
    backgroundColor: colors[Colors.primary],
    paddingBottom: 2,
  },
  activeTintColor: colors[Colors.white],
  inactiveTintColor: '#FFFFFF38',
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
      <Stack.Screen name="Home" component={HomeTabs} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="DigitalCvHome" component={DigitalCvHome} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Experience" component={Experience} />
    </Stack.Navigator>
  )
}

export default Home
