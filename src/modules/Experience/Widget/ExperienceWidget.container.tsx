import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { useSelector } from 'react-redux'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import ExperienceWidget from './ExperienceWidget'
import selector from './ExperienceWidget.selector'

interface Props {
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MyCv>
}

const ExperienceWidgetContainer = ({ navigation }: Props) => {
  const { userJobs, count } = useSelector(selector)
  return <ExperienceWidget userJobs={userJobs} count={count} navigation={navigation} />
}

export default ExperienceWidgetContainer
