import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { useSelector } from 'react-redux'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import EducationView from './EducationView'
import selector from './EducationView.selector'

interface Props {
  onAdd: () => void
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Education>
}
const EducationViewContainer = ({ onAdd, navigation }: Props) => {
  const { userQualifications } = useSelector(selector)
  return <EducationView onAdd={onAdd} navigation={navigation} userQualifications={userQualifications} />
}

export default EducationViewContainer
