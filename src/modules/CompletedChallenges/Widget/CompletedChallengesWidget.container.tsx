import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useSelector } from 'react-redux'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import CompletedChallengesWidget from './CompletedChallengesWidget'
import selector from './CompletedChallengesWidget.selector'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MyCv>
}

const CompletedChallengesWidgetContainer = ({ navigation }: Props) => {
  const { userChallenges, count } = useSelector(selector)
  return <CompletedChallengesWidget challenges={userChallenges} count={count} navigation={navigation} />
}

export default CompletedChallengesWidgetContainer
