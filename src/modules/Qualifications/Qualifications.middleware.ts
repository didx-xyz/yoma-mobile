import i18n from 'i18next'
import { mergeRight } from 'ramda'
import { Middleware } from 'redux'

import { actions as ApiActions } from '~/api'
import { constants as ApiQualificationConstants } from '~/api/qualifications'
import { actions as UserQualificationsActions } from '~/modules/UserQualifications'
import * as UserSkillsActions from '~/modules/UserSkills/UserSkills.reducer'
import { extractDataFromResponseAction } from '~/redux/redux.utils'
import { showSimpleMessage } from '~/utils/error'

import { createQualification, createQualificationFailure, createQualificationSuccess } from './Qualifications.reducer'

export const createQualificationFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (createQualification.match(action)) {
      dispatch(
        ApiActions.apiRequest(
          mergeRight(ApiQualificationConstants.QUALIFICATIONS_CREATE_CONFIG, {
            onSuccess: createQualificationSuccess,
            onFailure: createQualificationFailure,
          }),
          action.payload,
        ),
      )
    }
    return result
  }
export const createQualificationSuccessFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (createQualificationSuccess.match(action)) {
      const Qualification = extractDataFromResponseAction(action)
      dispatch(UserQualificationsActions.createUserQualification(Qualification))
      dispatch(UserSkillsActions.fetchUserSkills())
    }

    return result
  }

export const createQualificationFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (createQualificationFailure.match(action)) {
      // TODO: this should be handled by the notification module
      notification('danger', i18n.t('general.errorOccurred'), i18n.t('general.errorMessageTryAgain'))
    }
    return result
  }
