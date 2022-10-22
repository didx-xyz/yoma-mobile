import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'
import { MySkillsNavigation } from '~/modules/MySkills/types'

import MySkillsView from './MySkillsView'
import selector from './MySkillsView.selector'

interface Props {
  navigation: MySkillsNavigation
}

const MySkillsViewContainer = ({ navigation }: Props) => {
  const { userSkills, count } = useSelector(selector)
  const onAdd = useCallback(() => {
    navigation.navigate(HomeNavigationRoutes.MySkillsForm)
  }, [navigation])

  return <MySkillsView userSkills={userSkills} count={count} onAdd={onAdd} navigation={navigation} />
}

export default MySkillsViewContainer
