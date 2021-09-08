import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useSelector } from 'react-redux'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import MySkillsView from './MySkillsView'
import selector from './MySkillsView.selector'

interface Props {
  onAdd: () => void
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MySkills>
}

const MySkillsViewContainer = ({ navigation, onAdd }: Props) => {
  const { userSkills } = useSelector(selector)
  return <MySkillsView userSkills={userSkills} onAdd={onAdd} navigation={navigation} />
}

export default MySkillsViewContainer
