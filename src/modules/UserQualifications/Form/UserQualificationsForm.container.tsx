import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Formik } from 'formik'
import React from 'react'
import { useSelector } from 'react-redux'

import { types as HomeNavigationTypes } from '~/modules/HomeNavigation'

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
  onSubmit: (values: FormFields) => void
}
const UserQualificationsFormContainer = ({ navigation, onSubmit }: Props) => {
  const { organisations } = useSelector(selector)

  return (
    <Formik initialValues={INITIAL_FORM_VALUES} validationSchema={schema} onSubmit={onSubmit}>
      {formikHandlers => (
        <UserQualificationsForm navigation={navigation} organisationsDropDown={organisations} form={formikHandlers} />
      )}
    </Formik>
  )
}

export default UserQualificationsFormContainer
