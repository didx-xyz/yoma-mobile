import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useSelector } from 'react-redux'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import EducationView from './EducationView'
import selector from './EducationView.selector'

interface Props {
  onAdd: () => void
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Education>
}
const EducationViewContainer = ({ onAdd, navigation }: Props) => {
  const { qualifications } = useSelector(selector)
  return <EducationView onAdd={onAdd} navigation={navigation} qualifications={qualifications} />
}

export default EducationViewContainer
