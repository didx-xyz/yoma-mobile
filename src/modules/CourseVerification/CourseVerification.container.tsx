import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Formik } from 'formik'
import React from 'react'

import { HomeNavigatorParamsList } from '../HomeNavigation/HomeNavigation.types'
import CourseVerification from './CourseVerification'
import { INITIAL_VALUES } from './CourseVerification.constants'
import { schema } from './CourseVerification.validation'

type Props = {
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList>
}

const CourseVerificationContainer = ({ navigation }: Props) => {
  const handleSubmit = async (values: any) => {
    console.log('formValues::', values)
  }
  return (
    <Formik initialValues={INITIAL_VALUES} enableReinitialize validationSchema={schema} onSubmit={handleSubmit}>
      {formikHandlers => {
        return <CourseVerification navigation={navigation} form={formikHandlers} />
      }}
    </Formik>
  )
}

export default CourseVerificationContainer
