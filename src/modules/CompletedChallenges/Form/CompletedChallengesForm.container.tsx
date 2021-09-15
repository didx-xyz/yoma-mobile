import { StackNavigationProp } from '@react-navigation/stack'
import { Formik } from 'formik'
import React from 'react'
import { useSelector } from 'react-redux'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import { UserChallengeFormFields } from '../../UserChallenges/UserChallenges.types'
import CompletedChallengesForm from './CompletedChallengesForm'
import { INITIAL_FORM_VALUES } from './CompletedChallengesForm.constants'
import selector from './CompletedChallengesForm.selector'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.CompletedChallenges>
}
const CompletedChallengesFormContainer = ({ navigation }: Props) => {
  const { challenges, challengesDropDown } = useSelector(selector)
  const handleSubmit = (values: UserChallengeFormFields) => {
    console.log({ values })
  }

  return (
    <Formik initialValues={INITIAL_FORM_VALUES} onSubmit={handleSubmit}>
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
