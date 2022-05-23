import React from 'react'

import { ExperienceNavigation } from '~/modules/Experience/View/ExperienceView.types'
import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'

import ExperienceView from './View'

interface Props {
  navigation: ExperienceNavigation
}

const Experience = ({ navigation }: Props) => {
  return (
    <ExperienceView
      onAdd={() => {
        navigation.navigate(HomeNavigationRoutes.ExperienceForm)
      }}
      navigation={navigation}
    />
  )
}

export default Experience
