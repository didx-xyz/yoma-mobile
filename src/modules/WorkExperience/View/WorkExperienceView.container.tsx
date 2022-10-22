import React from 'react'
import { useSelector } from 'react-redux'

import WorkExperienceView from './WorkExperienceView'
import selector from './WorkExperienceView.selector'
import { WorkExperienceNavigation } from './WorkExperienceView.types'

interface Props {
  onAdd: () => void
  navigation: WorkExperienceNavigation
}
const WorkExperienceViewContainer = ({ onAdd, navigation }: Props) => {
  const { userWorkExperiences } = useSelector(selector)

  return <WorkExperienceView onAdd={onAdd} navigation={navigation} userWorkExperiences={userWorkExperiences} />
}

export default WorkExperienceViewContainer
