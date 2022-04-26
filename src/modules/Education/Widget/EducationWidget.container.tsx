import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { useSelector } from 'react-redux'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import EducationWidget from './EducationWidget'
import selector from './EducationWidget.selector'

interface Props {
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MyCv>
}

const EducationWidgetContainer = ({ navigation }: Props) => {
  const { userQualifications, count } = useSelector(selector)
  return <EducationWidget userQualifications={userQualifications} count={count} navigation={navigation} />
}

export default EducationWidgetContainer
