import { StackNavigationProp } from '@react-navigation/stack'
import { Formik } from 'formik'
import { createJob } from 'modules/Jobs/Jobs.reducer'
import { JobsRequest } from 'modules/Jobs/Jobs.types'
import { setFilterSearchTerm } from 'modules/Skills/Skills.reducer'
import { evolve } from 'ramda'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { dateToISOString } from '../../../utils/dates.utils'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import ExperienceForm from './ExperienceForm'
import { INITIAL_VALUES } from './ExperienceForm.constants'
import selector from './ExperienceForm.selector'
import { schema } from './ExperienceForm.validation'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Experience>
}
const ExperienceFormContainer = ({ navigation }: Props) => {
  const dispatch = useDispatch()
  const { organisations, skills } = useSelector(selector)

  const handleSubmit = (values: JobsRequest) => {
    const job = evolve({
      startTime: dateToISOString,
      endTime: dateToISOString,
    })(values)
    dispatch(createJob(job))
  }

  const onFilterSkills = (searchTerm: string) => {
    dispatch(setFilterSearchTerm(searchTerm))
  }

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      enableReinitialize
      validateOnMount
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {(formikHandlers: any) => (
        <ExperienceForm
          organisations={organisations}
          skills={skills}
          navigation={navigation}
          onFilterSkills={onFilterSkills}
          handlers={formikHandlers}
        />
      )}
    </Formik>
  )
}

export default ExperienceFormContainer
