import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useSelector } from 'react-redux'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import { UserChallengeFormFields } from '../../UserChallenges/UserChallenges.types'
import CompletedChallengesForm from './CompletedChallengesForm'
import selector from './CompletedChallengesFrom.selector'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.CompletedChallenges>
}
const CompletedChallengesFormContainer = ({ navigation }: Props) => {
  const { challenges } = useSelector(selector)
  const handleSubmit = (values: UserChallengeFormFields) => {
    console.log({ values })
  }

  return <CompletedChallengesForm navigation={navigation} challenges={challenges} onSubmit={handleSubmit} />
}

export default CompletedChallengesFormContainer
