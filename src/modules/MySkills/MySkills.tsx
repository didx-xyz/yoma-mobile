import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useState } from 'react'

import Optional from '../../components/Optional'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../HomeNavigation/HomeNavigation.types'
import SkillsForm from './Form/MySkillsForm'
import MySkillsView from './View'

interface Props {
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MySkills>
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
