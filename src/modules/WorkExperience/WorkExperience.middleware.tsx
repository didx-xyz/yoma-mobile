import i18n from 'i18next'
import { mergeRight } from 'ramda'
import { Middleware } from 'redux'

import { actions as ApiActions } from '~/api'
import { constants as ApiWorkExperienceConstants } from '~/api/workExperience'
import { extractDataFromResponseAction } from '~/redux/redux.utils'
import { showSimpleMessage } from '~/utils/error'

import * as UserSkillsActions from '../UserSkills/UserSkills.reducer'
import * as UserWorkExperience from '../UserWorkExperience/UserWorkExperience.reducer'
import {
  createWorkExperience,
  createWorkExperienceFailure,
  createWorkExperienceSuccess,
} from './WorkExperience.reducer'

export const createWorkExperienceFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (createWorkExperience.match(action)) {
      dispatch(
        ApiActions.apiRequest(
          mergeRight(ApiWorkExperienceConstants.WORK_EXPERIENCE_CREATE_CONFIG, {
            onSuccess: createWorkExperienceSuccess,
            onFailure: createWorkExperienceFailure,
          }),
          action.payload,
        ),
      )
    }
    return result
  }

export const createWorkExperienceSuccessFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (createWorkExperienceSuccess.match(action)) {
      const workExperience = extractDataFromResponseAction(action)
      dispatch(UserWorkExperience.createUserWorkExperience(workExperience))
      dispatch(UserSkillsActions.fetchUserSkills())
    }

    return result
  }

export const createWorkExperienceFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (createWorkExperienceFailure.match(action)) {
      // TODO: this should be handled by the notification module
      notification('danger', i18n.t('general.errorOccurred'), i18n.t('general.errorMessageTryAgain'))
    }
    return result
  }
