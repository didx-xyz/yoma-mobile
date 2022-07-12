import React from 'react'
import { useSelector } from 'react-redux'

import { types as MyCvTypes } from '~/modules/MyCv'

import MySkillsWidget from './MySkillsWidget'
import selector from './MySkillsWidget.selector'

interface Props {
  navigation: MyCvTypes.MyCvNavigation
}

const MySkillsWidgetContainer = ({ navigation }: Props) => {
  const { userSkills, count } = useSelector(selector)
  return <MySkillsWidget userSkills={userSkills} count={count} navigation={navigation} />
}

export default MySkillsWidgetContainer
