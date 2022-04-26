import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Formik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as FormUtils from '~/utils/form.utils'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import { actions as UserChallengesActions } from '../../UserChallenges'
import { schema } from './CompletedChallengeForm.validation'
import CompletedChallengesForm from './CompletedChallengesForm'
import { INITIAL_FORM_VALUES } from './CompletedChallengesForm.constants'
import selector from './CompletedChallengesForm.selector'
import { FormFields } from './CompletedChallengesForm.types'

interface Props {
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.CompletedChallenges>
}
const CompletedChallengesFormContainer = ({ navigation }: Props) => {
  const { challenges, challengesDropDown } = useSelector(selector)
  const dispatch = useDispatch()

  const handleSubmit = (values: FormFields) => {
    const challenge = FormUtils.sanitiseDateRange(values)
    dispatch(UserChallengesActions.createUserChallenge(challenge))
  }

  return (
    <Formik initialValues={INITIAL_FORM_VALUES} validationSchema={schema} onSubmit={handleSubmit}>
      {formikHandlers => (
        <CompletedChallengesForm
          navigation={navigation}
          challenges={challenges}
          challengesDropDown={challengesDropDown}
          form={formikHandlers}
        />
      )}
    </Formik>
  )
}

export default CompletedChallengesFormContainer
