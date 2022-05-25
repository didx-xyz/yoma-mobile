import React from 'react'

import { EducationNavigation } from '~/modules/Education/types'
import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'

import EducationView from './View'

interface Props {
  navigation: EducationNavigation
}

const Education = ({ navigation }: Props) => (
  <EducationView
    onAdd={() => {
      navigation.navigate(HomeNavigationRoutes.EducationForm)
    }}
    navigation={navigation}
  />
)

export default Education
