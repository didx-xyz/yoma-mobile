import React from 'react'
import { useSelector } from 'react-redux'

import { CompleteChallengesNavigation } from '~/modules/CompletedChallenges/types'

import CompletedChallengesView from './CompletedChallengesView'
import selector from './CompletedChallengesView.selector'

interface Props {
  onAdd: () => void
  navigation: CompleteChallengesNavigation
}
const CompletedChallengesViewContainer = ({ onAdd, navigation }: Props) => {
  const { userChallenges } = useSelector(selector)

  return <CompletedChallengesView onAdd={onAdd} navigation={navigation} userChallenges={userChallenges} />
}

export default CompletedChallengesViewContainer
