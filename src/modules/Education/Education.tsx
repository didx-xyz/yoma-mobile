import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'

import Optional from '../../components/Optional'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../HomeNavigation/HomeNavigation.types'
import EducationForm from './Form'
import EducationView from './View'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Education>
}

const Education = ({ navigation }: Props) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleAdd = () => setIsEditing(true)

  return (
    <Optional condition={isEditing} fallback={<EducationView onAdd={handleAdd} navigation={navigation} />}>
      <EducationForm navigation={navigation} />
    </Optional>
  )
}

export default Education
