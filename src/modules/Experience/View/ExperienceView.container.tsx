import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useSelector } from 'react-redux'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import ExperienceView from './ExperienceView'
import selector from './ExperienceView.selector'

interface Props {
  onAdd: () => void
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Experience>
}
const ExperienceViewContainer = ({ onAdd, navigation }: Props) => {
  const { userJobs } = useSelector(selector)

  return <ExperienceView onAdd={onAdd} navigation={navigation} userJobs={userJobs} />
}

export default ExperienceViewContainer
