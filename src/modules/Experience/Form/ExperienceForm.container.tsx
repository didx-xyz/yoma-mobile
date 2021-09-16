import { StackNavigationProp } from '@react-navigation/stack'
import { Formik } from 'formik'
import { evolve } from 'ramda'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as DateUtils from '../../../utils/dates.utils'
import { types as HomeNavigationTypes } from '../../HomeNavigation'
import { actions as JobActions, types as JobTypes } from '../../Jobs'
import { actions as SkillsActions } from '../../Skills'
import ExperienceForm from './ExperienceForm'
import { INITIAL_VALUES } from './ExperienceForm.constants'
import selector from './ExperienceForm.selector'
import { schema } from './ExperienceForm.validation'

interface Props {
  navigation: StackNavigationProp<
    HomeNavigationTypes.HomeNavigatorParamsList,
    HomeNavigationTypes.HomeNavigationRoutes.Experience
  >
}
const ExperienceFormContainer = ({ navigation }: Props) => {
  const dispatch = useDispatch()
  const { organisations, skills } = useSelector(selector)

  const handleSubmit = (values: JobTypes.JobsRequest) => {
    const job = evolve({
      startTime: DateUtils.dateToISOString,
      endTime: DateUtils.dateToISOString,
    })(values)
    dispatch(JobActions.createJob(job))
  }

  const onFilterSkills = (searchTerm: string) => {
    dispatch(SkillsActions.setFilterSearchTerm(searchTerm))
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
