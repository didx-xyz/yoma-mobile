import React from 'react'

import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'

import ExperienceView, { types as viewTypes } from './View'

interface Props {
  navigation: viewTypes.WorkExperienceNavigation
}

const WorkExperience = ({ navigation }: Props) => (
  <ExperienceView
    onAdd={() => {
      navigation.navigate(HomeNavigationRoutes.WorkExperienceForm)
    }}
    navigation={navigation}
  />
)

export default WorkExperience
