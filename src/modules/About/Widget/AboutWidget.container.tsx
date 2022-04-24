import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { useSelector } from 'react-redux'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import AboutWidget from './AboutWidget'
import selector from './AboutWidget.selector'

interface Props {
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MyCv>
}

const AboutWidgetContainer = ({ navigation }: Props) => {
  const { biography } = useSelector(selector)
  return <AboutWidget biography={biography} navigation={navigation} />
}

export default AboutWidgetContainer
