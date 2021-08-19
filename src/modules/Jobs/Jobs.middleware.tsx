import { createUserJobs } from 'modules/UserJobs/UserJobs.reducer'
import { mergeRight } from 'ramda'
import { Middleware } from 'redux'
import { showSimpleMessage } from 'utils/error'
import { extractDataFromPayload } from 'utils/redux.utils'

import { actions as ApiActions } from '../../api'
import { constants as ApiJobsConstants } from '../../api/jobs'
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
      const job = extractDataFromPayload(action)
      dispatch(createUserJobs(job))
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
      notification('danger', 'An error occurred.', 'Oops something went wrong! Please try again.')
    }
    return result
  }
