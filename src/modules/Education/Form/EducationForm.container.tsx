import { StackNavigationProp } from '@react-navigation/stack'
import { Formik } from 'formik'
import React from 'react'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import EducationForm from './EducationForm'
import { INITIAL_FORM_VALUES } from './EducationForm.constants'
import { FormFields } from './EducationForm.types'
import { schema } from './EducationForm.validation'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Education>
}
const EducationFormContainer = ({ navigation }: Props) => {
  const handleSubmit = (values: FormFields) => {
    console.log({ values })
  }

  return (
    <Formik initialValues={INITIAL_FORM_VALUES} validationSchema={schema} onSubmit={handleSubmit}>
      {formikHandlers => (
        <EducationForm
          navigation={navigation}
          skillsDropDown={[
            { label: 'skill 1', value: 'skill1' },
            { label: 'skill 2', value: 'skill2' },
          ]}
          organisationsDropDown={[
            { label: 'org 1', value: 'org1' },
            { label: 'org 2', value: 'org2' },
          ]}
          form={formikHandlers}
        />
      )}
    </Formik>
  )
}

export default EducationFormContainer
