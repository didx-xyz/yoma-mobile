import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Formik } from 'formik'
import { pipe } from 'ramda'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { types as HomeNavigationTypes } from '~/modules/HomeNavigation'
import { actions as QualificationActions } from '~/modules/Qualifications'
import * as FormUtils from '~/utils/form.utils'

import UserQualificationsForm from './UserQualificationsForm'
import { INITIAL_FORM_VALUES } from './UserQualificationsForm.constants'
import selector from './UserQualificationsForm.selector'
import { FormFields } from './UserQualificationsForm.types'
import { schema } from './UserQualificationsForm.validation'

interface Props {
  navigation: NativeStackNavigationProp<
    HomeNavigationTypes.HomeNavigatorParamsList,
    HomeNavigationTypes.HomeNavigationRoutes.Education
  >
  title: string
}
const UserQualificationsFormContainer = ({ title, navigation }: Props) => {
  const { organisations } = useSelector(selector)

  const dispatch = useDispatch()

  const handleSubmit = (values: FormFields) => {
    const qualification = pipe(FormUtils.sanitiseDateRange, FormUtils.countriesAsArray)(values)
    dispatch(QualificationActions.createQualification(qualification))
  }

  return (
    <Formik initialValues={INITIAL_FORM_VALUES} validationSchema={schema} onSubmit={handleSubmit}>
      {formikHandlers => (
        <UserQualificationsForm
          title={title}
          navigation={navigation}
          organisationsDropDown={organisations}
          form={formikHandlers}
        />
      )}
    </Formik>
  )
}

export default UserQualificationsFormContainer
