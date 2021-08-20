import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useSelector } from 'react-redux'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import UserChallengesWidget from './UserChallengesWidget'
import selector from './UserChallengesWidget.selector'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.DigitalCv>
}

const UserChallengesWidgetContainer = ({ navigation }: Props) => {
  const { challenges } = useSelector(selector)
  return <UserChallengesWidget challenges={challenges} navigation={navigation} />
}

export default UserChallengesWidgetContainer
