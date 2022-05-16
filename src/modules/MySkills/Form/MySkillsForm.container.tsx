import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useCallback } from 'react'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import MySkillsForm from './MySkillsForm'

interface Props {
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MySkills>
}

const MySkillsFormContainer = ({ navigation }: Props) => {
  const onAdd = useCallback(() => {
    console.log('saving...')
  }, [])
  return <MySkillsForm onSave={onAdd} navigation={navigation} />
}

export default MySkillsFormContainer
