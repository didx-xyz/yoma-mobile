import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useSelector } from 'react-redux'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import MySkillsWidget from './MySkillsWidget'
import selector from './MySkillsWidget.selector'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MyCv>
}

const MySkillsWidgetContainer = ({ navigation }: Props) => {
  const { userSkills, count } = useSelector(selector)
  return <MySkillsWidget userSkills={userSkills} count={count} navigation={navigation} />
}

export default MySkillsWidgetContainer
