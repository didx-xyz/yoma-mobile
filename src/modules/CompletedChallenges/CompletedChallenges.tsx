import React from 'react'

import { CompleteChallengesNavigation } from '~/modules/CompletedChallenges/types'
import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'

import CompletedChallengesView from './View'

interface Props {
  navigation: CompleteChallengesNavigation
}

const CompletedChallenges = ({ navigation }: Props) => (
  <CompletedChallengesView
    onAdd={() => {
      navigation.navigate(HomeNavigationRoutes.CompletedChallengesForm)
    }}
    navigation={navigation}
  />
)

export default CompletedChallenges
