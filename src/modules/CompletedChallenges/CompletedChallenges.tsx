import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'

import Optional from '../../components/Optional'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../HomeNavigation/HomeNavigation.types'
import CompletedChallengesForm from './Form'
import CompletedChallengesView from './View'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.CompletedChallenges>
}

const CompletedChallenges = ({ navigation }: Props) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleAdd = () => setIsEditing(true)

  return (
    <Optional condition={isEditing} fallback={<CompletedChallengesView onAdd={handleAdd} navigation={navigation} />}>
      <CompletedChallengesForm navigation={navigation} />
    </Optional>
  )
}

export default CompletedChallenges
