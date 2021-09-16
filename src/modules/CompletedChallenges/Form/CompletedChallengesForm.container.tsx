import { StackNavigationProp } from '@react-navigation/stack'
import { Formik } from 'formik'
import React from 'react'
import { useSelector } from 'react-redux'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import { schema } from './CompletedChallengeForm.validation'
import CompletedChallengesForm from './CompletedChallengesForm'
import { INITIAL_FORM_VALUES } from './CompletedChallengesForm.constants'
import selector from './CompletedChallengesForm.selector'
import { CompletedChallengesFormFields } from './CompletedChallengesForm.types'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.CompletedChallenges>
}
const CompletedChallengesFormContainer = ({ navigation }: Props) => {
  const { challenges, challengesDropDown } = useSelector(selector)
  const handleSubmit = (values: CompletedChallengesFormFields) => {
    console.log({ values })
  }

  return (
    <Formik initialValues={INITIAL_FORM_VALUES} validationSchema={schema} onSubmit={handleSubmit}>
      {formikHandlers => (
        <CompletedChallengesForm
          navigation={navigation}
          challenges={challenges}
          challengesDropDown={challengesDropDown}
          handlers={formikHandlers}
        />
      )}
    </Formik>
  )
}

export default CompletedChallengesFormContainer
