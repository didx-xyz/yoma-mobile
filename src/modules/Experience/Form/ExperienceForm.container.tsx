import { StackNavigationProp } from '@react-navigation/stack'
import { createJob } from 'modules/Jobs/Jobs.reducer'
import { JobsRequest } from 'modules/Jobs/Jobs.types'
import { setFilterSearchTerm } from 'modules/Skills/Skills.reducer'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import ExperienceForm from './ExperienceForm'
import selector from './ExperienceForm.selector'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Experience>
}
const ExperienceFormContainer = ({ navigation }: Props) => {
  const dispatch = useDispatch()
  const { organisations, skills } = useSelector(selector)

  const onJobCreate = (job: JobsRequest) => {
    dispatch(createJob(job))
  }

  const onFilterSkills = (searchTerm: string) => {
    dispatch(setFilterSearchTerm(searchTerm))
  }

  return (
    <ExperienceForm
      organisations={organisations}
      skills={skills}
      navigation={navigation}
      onJobCreate={onJobCreate}
      onFilterSkills={onFilterSkills}
    />
  )
}

export default ExperienceFormContainer
