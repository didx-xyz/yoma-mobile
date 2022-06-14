import React from 'react'

import { CompletedCoursesNavigation } from '~/modules/CompletedCourses/types'
import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'

import CompletedCoursesView from './View'

interface Props {
  navigation: CompletedCoursesNavigation
}

const CompletedCourses = ({ navigation }: Props) => (
  <CompletedCoursesView
    onAdd={() => {
      navigation.navigate(HomeNavigationRoutes.EducationForm)
    }}
    navigation={navigation}
  />
)

export default CompletedCourses
