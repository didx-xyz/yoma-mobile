import React from 'react'
import { useSelector } from 'react-redux'

import { CompletedCoursesNavigation } from '~/modules/CompletedCourses/types'

import CompletedCoursesView from './CompletedCoursesView'
import selector from './CompletedCoursesView.selector'

interface Props {
  onAdd: () => void
  navigation: CompletedCoursesNavigation
}
const CompletedCoursesViewContainer = ({ onAdd, navigation }: Props) => {
  const { userQualifications } = useSelector(selector)

  return <CompletedCoursesView onAdd={onAdd} navigation={navigation} userQualifications={userQualifications} />
}

export default CompletedCoursesViewContainer
