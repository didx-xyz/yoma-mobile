import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { useSelector } from 'react-redux'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import selector from '../About.selector'
import AboutWidget from './AboutWidget'

interface Props {
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MyCv>
}

const AboutWidgetContainer = ({ navigation }: Props) => {
  const { biography } = useSelector(selector)
  return <AboutWidget biography={biography} navigation={navigation} />
}

export default AboutWidgetContainer
