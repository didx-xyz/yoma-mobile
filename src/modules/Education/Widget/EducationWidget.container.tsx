import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useSelector } from 'react-redux'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import EducationWidget from './EducationWidget'
import selector from './EducationWidget.selector'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MyCv>
}

const EducationWidgetContainer = ({ navigation }: Props) => {
  const { qualifications } = useSelector(selector)
  return <EducationWidget qualifications={qualifications} navigation={navigation} />
}

export default EducationWidgetContainer
