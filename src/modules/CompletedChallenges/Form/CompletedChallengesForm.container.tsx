import { Formik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// working around require cycle.
import * as UserChallengesActions from '~/modules/UserChallenges/UserChallenges.reducer'
import * as FormUtils from '~/utils/form.utils'

import { CompleteChallengesNavigation } from '../types'
import { schema } from './CompletedChallengeForm.validation'
import CompletedChallengesForm from './CompletedChallengesForm'
import { INITIAL_FORM_VALUES } from './CompletedChallengesForm.constants'
import selector from './CompletedChallengesForm.selector'
import { FormFields } from './CompletedChallengesForm.types'

interface Props {
  navigation: CompleteChallengesNavigation
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
