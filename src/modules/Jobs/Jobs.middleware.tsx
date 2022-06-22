import { mergeRight } from 'ramda'
import { Middleware } from 'redux'

import { actions as ApiActions } from '~/api'
import { constants as ApiJobsConstants } from '~/api/jobs'
import * as Strings from '~/constants/strings.constants'
import * as UserJobsActions from '~/modules/UserJobs/UserJobs.reducer'
import * as UserSkillsActions from '~/modules/UserSkills/UserSkills.reducer'
import { extractDataFromResponseAction } from '~/redux/redux.utils'
import { showSimpleMessage } from '~/utils/error'

import { createJob, createJobFailure, createJobSuccess } from './Jobs.reducer'

export const createJobFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (createJob.match(action)) {
      dispatch(
        ApiActions.apiRequest(
          mergeRight(ApiJobsConstants.JOBS_CREATE_CONFIG, {
            onSuccess: createJobSuccess,
            onFailure: createJobFailure,
          }),
          action.payload,
        ),
      )
    }
    return result
  }

export const createJobSuccessFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (createJobSuccess.match(action)) {
      const job = extractDataFromResponseAction(action)
      dispatch(UserJobsActions.createUserJob(job))
      dispatch(UserSkillsActions.fetchUserSkills())
    }

    return result
  }

export const createJobFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (createJobFailure.match(action)) {
      // TODO: this should be handled by the notification module
      notification('danger', Strings.AN_ERROR_OCCURRED, Strings.OOPS_SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN)
    }
    return result
  }
