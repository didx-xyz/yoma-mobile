import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'

import Optional from '../../components/Optional'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../HomeNavigation/HomeNavigation.types'
import ExperienceForm from './Form'
import ExperienceView from './View'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Experience>
}

const Experience = ({ navigation }: Props) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleAddUserJob = () => {
    setIsEditing(true)
  }

  return (
    <Optional condition={isEditing} fallback={<ExperienceView onAdd={handleAddUserJob} navigation={navigation} />}>
      <ExperienceForm navigation={navigation} />
    </Optional>
  )
}

export default Experience
