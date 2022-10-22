import { Formik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as FormUtils from '~/utils/form.utils'

import { createWorkExperience } from '../WorkExperience.reducer'
import { WorkExperienceRequest } from '../WorkExperience.types'
import WorkExperienceForm from './WorkExperienceForm'
import { INITIAL_VALUES } from './WorkExperienceForm.constants'
import selector from './WorkExperienceForm.selector'
import { WorkExperienceFormNavigation } from './WorkExperienceForm.types'
import { schema } from './WorkExperienceForm.validation'

interface Props {
  navigation: WorkExperienceFormNavigation
}
const WorkExperienceFormContainer = ({ navigation }: Props) => {
  const dispatch = useDispatch()
  const { organisations } = useSelector(selector)

  const handleSubmit = (values: WorkExperienceRequest) => {
    const workExperience = FormUtils.sanitiseDateRange(values)
    dispatch(createWorkExperience(workExperience))
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
        <WorkExperienceForm organisations={organisations} navigation={navigation} form={formikHandlers} />
      )}
    </Formik>
  )
}

export default WorkExperienceFormContainer
