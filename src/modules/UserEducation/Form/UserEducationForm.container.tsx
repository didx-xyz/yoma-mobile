import { Formik } from 'formik'
import { pipe } from 'ramda'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CompletedCoursesNavigation } from '~/modules/CompletedCourses/types'
import { actions as EducationActions } from '~/modules/Education'
import { EducationNavigation } from '~/modules/Education/types'
import * as FormUtils from '~/utils/form.utils'

import UserEducationForm from './UserEducationForm'
import { INITIAL_FORM_VALUES } from './UserEducationForm.constants'
import selector from './UserEducationForm.selector'
import { FormFields } from './UserEducationForm.types'
import { schema } from './UserEducationForm.validation'

interface Props {
  navigation: EducationNavigation | CompletedCoursesNavigation
  title: string
}
const UserEducationFormContainer = ({ title, navigation }: Props) => {
  const { organisations } = useSelector(selector)

  const dispatch = useDispatch()

  const handleSubmit = (values: FormFields) => {
    const qualification = pipe(FormUtils.sanitiseDateRange, FormUtils.countriesAsArray)(values)
    dispatch(EducationActions.createEducation(qualification))
  }

  return (
    <Formik initialValues={INITIAL_FORM_VALUES} validationSchema={schema} onSubmit={handleSubmit}>
      {formikHandlers => (
        <UserEducationForm
          title={title}
          navigation={navigation}
          organisationsDropDown={organisations}
          form={formikHandlers}
        />
      )}
    </Formik>
  )
}

export default UserEducationFormContainer
