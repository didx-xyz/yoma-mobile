import React from 'react'
import { useSelector } from 'react-redux'

import { types as MyCvTypes } from '~/modules/MyCv'

import WorkExperienceWidget from './WorkExperienceWidget'
import selector from './WorkExperienceWidget.selector'

interface Props {
  navigation: MyCvTypes.MyCvNavigation
}

const WorkExperienceWidgetContainer = ({ navigation }: Props) => {
  const { userWorkExperiences, count } = useSelector(selector)
  return <WorkExperienceWidget userWorkExperiences={userWorkExperiences} count={count} navigation={navigation} />
}

export default WorkExperienceWidgetContainer
