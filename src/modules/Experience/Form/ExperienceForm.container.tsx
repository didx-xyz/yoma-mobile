import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Formik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { types as HomeNavigationTypes } from '~/modules/HomeNavigation'
import { actions as JobActions, types as JobTypes } from '~/modules/Jobs'
import * as FormUtils from '~/utils/form.utils'

import ExperienceForm from './ExperienceForm'
import { INITIAL_VALUES } from './ExperienceForm.constants'
import selector from './ExperienceForm.selector'
import { schema } from './ExperienceForm.validation'

interface Props {
  navigation: NativeStackNavigationProp<
    HomeNavigationTypes.HomeNavigatorParamsList,
    HomeNavigationTypes.HomeNavigationRoutes.Experience
  >
}
const ExperienceFormContainer = ({ navigation }: Props) => {
  const dispatch = useDispatch()
  const { organisations } = useSelector(selector)

  const handleSubmit = (values: JobTypes.JobsRequest) => {
    const job = FormUtils.sanitiseDateRange(values)
    dispatch(JobActions.createJob(job))
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
        <ExperienceForm organisations={organisations} navigation={navigation} form={formikHandlers} />
      )}
    </Formik>
  )
}

export default ExperienceFormContainer
