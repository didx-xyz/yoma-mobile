import React from 'react'
import { useSelector } from 'react-redux'

import { types as MyCvTypes } from '~/modules/MyCv'

import CompletedChallengesWidget from './CompletedChallengesWidget'
import selector from './CompletedChallengesWidget.selector'

interface Props {
  navigation: MyCvTypes.MyCvNavigation
}

const CompletedChallengesWidgetContainer = ({ navigation }: Props) => {
  const { userChallenges, count } = useSelector(selector)
  return <CompletedChallengesWidget userChallenges={userChallenges} count={count} navigation={navigation} />
}

export default CompletedChallengesWidgetContainer
