import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Formik } from 'formik'
import { pipe } from 'ramda'
import React from 'react'
import { useDispatch } from 'react-redux'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '~/modules/HomeNavigation/HomeNavigation.types'
import { actions as QualificationActions } from '~/modules/Qualifications'
import * as FormUtils from '~/utils/form.utils'

import CompletedCoursesForm from './CompletedCoursesForm'
import { INITIAL_FORM_VALUES } from './CompletedCoursesForm.constants'
import { FormFields } from './CompletedCoursesForm.types'
import { schema } from './CompletedCoursesForm.validation'

interface Props {
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Education>
}
const CompletedCoursesFormContainer = ({ navigation }: Props) => {
  const dispatch = useDispatch()

  const handleSubmit = (values: FormFields) => {
    const qualification = pipe(FormUtils.sanitiseDateRange, FormUtils.countriesAsArray)(values)
    dispatch(QualificationActions.createQualification(qualification))
  }

  return (
    <Formik initialValues={INITIAL_FORM_VALUES} validationSchema={schema} onSubmit={handleSubmit}>
      {formikHandlers => <CompletedCoursesForm navigation={navigation} form={formikHandlers} />}
    </Formik>
  )
}

export default CompletedCoursesFormContainer
