import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { CompleteChallengesNavigation } from '~/modules/CompletedChallenges/types'

import { HomeNavigationRoutes } from '../../HomeNavigation/HomeNavigation.types'
import CompletedChallengesView from './CompletedChallengesView'
import selector from './CompletedChallengesView.selector'

interface Props {
  navigation: CompleteChallengesNavigation
}
const CompletedChallengesViewContainer = ({ navigation }: Props) => {
  const { userChallenges } = useSelector(selector)

  const onAdd = useCallback(() => {
    navigation.navigate(HomeNavigationRoutes.CompletedChallengesForm)
  }, [navigation])

  return <CompletedChallengesView onAdd={onAdd} navigation={navigation} userChallenges={userChallenges} />
}

export default CompletedChallengesViewContainer
