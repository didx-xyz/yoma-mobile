import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { useSelector } from 'react-redux'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import CompletedCoursesWidget from './CompletedCoursesWidget'
import selector from './CompletedCoursesWidget.selector'

interface Props {
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MyCv>
}

const CompletedCoursesWidgetContainer = ({ navigation }: Props) => {
  const { userQualifications, count } = useSelector(selector)
  return <CompletedCoursesWidget userQualifications={userQualifications} count={count} navigation={navigation} />
}

export default CompletedCoursesWidgetContainer
