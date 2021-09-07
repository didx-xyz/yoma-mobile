import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useSelector } from 'react-redux'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import CompletedChallengesView from './CompletedChallengesView'
import selector from './CompletedChallengesView.selector'

interface Props {
  onAdd: () => void
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.CompletedChallenges>
}
const CompletedChallengesViewContainer = ({ onAdd, navigation }: Props) => {
  const { userChallenges } = useSelector(selector)
  return <CompletedChallengesView onAdd={onAdd} navigation={navigation} userChallenges={userChallenges} />
}

export default CompletedChallengesViewContainer
