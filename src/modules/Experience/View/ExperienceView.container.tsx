import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'

import ExperienceView from './ExperienceView'
import selector from './ExperienceView.selector'
import { WorkExperienceNavigation } from './ExperienceView.types'

interface Props {
  navigation: WorkExperienceNavigation
}
const ExperienceViewContainer = ({ navigation }: Props) => {
  const { userWorkExperiences } = useSelector(selector)
  const onAdd = useCallback(() => {
    navigation.navigate(HomeNavigationRoutes.WorkExperienceForm)
  }, [navigation])

  return <ExperienceView onAdd={onAdd} navigation={navigation} userWorkExperiences={userWorkExperiences} />
}

export default ExperienceViewContainer
