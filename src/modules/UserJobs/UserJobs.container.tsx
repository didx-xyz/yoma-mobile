import { StackNavigationProp } from '@react-navigation/stack'
import { createJob } from 'modules/Jobs/Jobs.reducer'
import { JobsRequest } from 'modules/Jobs/Jobs.types'
import { setFilterSearchTerm } from 'modules/Skills/Skills.reducer'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../HomeNavigation/HomeNavigation.types'
import UserJobs from './UserJobs'
import selector from './UserJobs.selector'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.UserJobs>
}
const UserJobsContainer = ({ navigation }: Props) => {
  const dispatch = useDispatch()
  const { userJobs, organisations, skills } = useSelector(selector)

  const onJobCreate = (job: JobsRequest) => {
    dispatch(createJob(job))
  }

  const onFilterSkills = (searchTerm: string) => {
    dispatch(setFilterSearchTerm(searchTerm))
  }

  return (
    <UserJobs
      userJobs={userJobs}
      organisations={organisations}
      skills={skills}
      navigation={navigation}
      onJobCreate={onJobCreate}
      onFilterSkills={onFilterSkills}
    />
  )
}

export default UserJobsContainer
