import i18n from 'i18next'
import { mergeRight } from 'ramda'
import { Middleware } from 'redux'

import { actions as ApiActions } from '~/api'
import { constants as ApiEducationConstants } from '~/api/education'
import * as UserEducationActions from '~/modules/UserQualifications/UserQualifications.reducer'
import * as UserSkillsActions from '~/modules/UserSkills/UserSkills.reducer'
import { extractDataFromResponseAction } from '~/redux/redux.utils'
import { showSimpleMessage } from '~/utils/error'

import { createEducation, createEducationFailure, createEducationSuccess } from './Education.reducer'

export const createEducationFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (createEducation.match(action)) {
      dispatch(
        ApiActions.apiRequest(
          mergeRight(ApiEducationConstants.EDUCATION_CREATE_CONFIG, {
            onSuccess: createEducationSuccess,
            onFailure: createEducationFailure,
          }),
          action.payload,
        ),
      )
    }
    return result
  }
export const createEducationSuccessFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (createEducationSuccess.match(action)) {
      const Education = extractDataFromResponseAction(action)
      dispatch(UserEducationActions.createUserQualification(Education))
      dispatch(UserSkillsActions.fetchUserSkills())
    }

    return result
  }

export const createEducationFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (createEducationFailure.match(action)) {
      // TODO: this should be handled by the notification module
      notification('danger', i18n.t('general.errorOccurred'), i18n.t('general.errorMessageTryAgain'))
    }
    return result
  }
