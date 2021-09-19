import { StackNavigationProp } from '@react-navigation/stack'
import { Formik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as FormUtils from '../../../utils/form.utils'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import { actions as UserChallengesActions } from '../../UserChallenges'
import { schema } from './CompletedChallengeForm.validation'
import CompletedChallengesForm from './CompletedChallengesForm'
import { INITIAL_FORM_VALUES } from './CompletedChallengesForm.constants'
import selector from './CompletedChallengesForm.selector'
import { FormFields } from './CompletedChallengesForm.types'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.CompletedChallenges>
}
const CompletedChallengesFormContainer = ({ navigation }: Props) => {
  const { challenges, challengesDropDown } = useSelector(selector)
  const dispatch = useDispatch()
  const handleSubmit = (values: FormFields) => {
    dispatch(UserChallengesActions.createUserChallenge(FormUtils.sanitiseDateRange(values)))
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
