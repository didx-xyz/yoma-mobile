import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useState } from 'react'

import Optional from '~/components/Optional'

import { types as HomeNavigationTypes } from '../HomeNavigation'
import SkillsForm from './Form'
import MySkillsView from './View'

interface Props {
  navigation: NativeStackNavigationProp<
    HomeNavigationTypes.HomeNavigatorParamsList,
    HomeNavigationTypes.HomeNavigationRoutes.MySkills
  >
}

const MySkills = ({ navigation }: Props) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleAddUserSkills = () => {
    setIsEditing(true)
  }

  return (
    <Optional condition={isEditing} fallback={<MySkillsView navigation={navigation} onAdd={handleAddUserSkills} />}>
      <SkillsForm navigation={navigation} />
    </Optional>
  )
}

export default MySkills
