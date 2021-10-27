import { StackNavigationProp } from '@react-navigation/stack'
import { Form, Formik } from 'formik'
import { pipe } from 'ramda'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as FormUtils from '../../../utils/form.utils'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import { actions as QualificationActions } from '../../Qualifications'
import EducationForm from './EducationForm'
import { INITIAL_FORM_VALUES } from './EducationForm.constants'
import selector from './EducationForm.selector'
import { FormFields } from './EducationForm.types'
import { schema } from './EducationForm.validation'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Education>
}
const EducationFormContainer = ({ navigation }: Props) => {
  const { organisations, skills } = useSelector(selector)
  const dispatch = useDispatch()

  const handleSubmit = (values: FormFields) => {
    const qualification = pipe(FormUtils.sanitiseDateRange, FormUtils.countriesAsArray)(values)
    dispatch(QualificationActions.createQualification(qualification))
  }

  return (
    <Formik initialValues={INITIAL_FORM_VALUES} validationSchema={schema} onSubmit={handleSubmit}>
      {formikHandlers => (
        <EducationForm
          navigation={navigation}
          skillsDropDown={skills}
          organisationsDropDown={organisations}
          form={formikHandlers}
        />
      )}
    </Formik>
  )
}

export default EducationFormContainer
