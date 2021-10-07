import { StackNavigationProp } from '@react-navigation/stack'
import { Formik } from 'formik'
import React from 'react'
import { useSelector } from 'react-redux'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
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
  const handleSubmit = (values: FormFields) => {
    console.log({ values })
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
