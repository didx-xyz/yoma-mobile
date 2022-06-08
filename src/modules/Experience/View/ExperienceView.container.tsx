import React from 'react'
import { useSelector } from 'react-redux'

import { ExperienceNavigation } from '~/modules/Experience/View/ExperienceView.types'

import ExperienceView from './ExperienceView'
import selector from './ExperienceView.selector'

interface Props {
  onAdd: () => void
  navigation: ExperienceNavigation
}
const ExperienceViewContainer = ({ onAdd, navigation }: Props) => {
  const { userJobs } = useSelector(selector)

  return <ExperienceView onAdd={onAdd} navigation={navigation} userJobs={userJobs} />
}

export default ExperienceViewContainer
