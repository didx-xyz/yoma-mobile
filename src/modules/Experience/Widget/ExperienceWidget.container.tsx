import React from 'react'
import { useSelector } from 'react-redux'

import { types as MyCvTypes } from '~/modules/MyCv'

import ExperienceWidget from './ExperienceWidget'
import selector from './ExperienceWidget.selector'

interface Props {
  navigation: MyCvTypes.MyCvNavigation
}

const ExperienceWidgetContainer = ({ navigation }: Props) => {
  const { userJobs, count } = useSelector(selector)
  return <ExperienceWidget userJobs={userJobs} count={count} navigation={navigation} />
}

export default ExperienceWidgetContainer
