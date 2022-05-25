import React from 'react'

import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'
import { MySkillsNavigation } from '~/modules/MySkills/types'

import MySkillsView from './View'

interface Props {
  navigation: MySkillsNavigation
}

const MySkills = ({ navigation }: Props) => (
  <MySkillsView
    onAdd={() => {
      navigation.navigate(HomeNavigationRoutes.MySkillsForm)
    }}
    navigation={navigation}
  />
)

export default MySkills
