import React from 'react'
import { useSelector } from 'react-redux'

import { MySkillsNavigation } from '~/modules/MySkills/types'

import MySkillsView from './MySkillsView'
import selector from './MySkillsView.selector'

interface Props {
  onAdd: () => void
  navigation: MySkillsNavigation
}

const MySkillsViewContainer = ({ navigation, onAdd }: Props) => {
  const { userSkills, count } = useSelector(selector)

  return <MySkillsView userSkills={userSkills} count={count} onAdd={onAdd} navigation={navigation} />
}

export default MySkillsViewContainer
