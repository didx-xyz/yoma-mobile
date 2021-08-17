import { UserCredentialTypes } from 'api/users/users.types'
import {
  setCredentialCertificate,
  setCredentialItemId,
} from 'modules/CredentialCertificate/CredentialCertificate.reducer'
import {
  extractCredentialItemFromJobFormValues,
  extractCredentialItemIdFromPayload,
} from 'modules/CredentialCertificate/CredentialCertificate.utils'
import { HomeNavigationRoutes } from 'modules/HomeNavigation/HomeNavigation.types'
import { mergeRight } from 'ramda'
import { Middleware } from 'redux'
import { showSimpleMessage } from 'utils/error'
import { extractDataFromPayload } from 'utils/redux.utils'

import { actions as ApiActions } from '../../api'
import { constants as ApiJobsConstants } from '../../api/jobs'
import * as Navigation from '../Navigation/Navigation.actions'
import { createJob, createJobFailure, createJobSuccess, setJob } from './Jobs.reducer'

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
      const credentialValues = extractCredentialItemFromJobFormValues(UserCredentialTypes.Job)(action)
      dispatch(setCredentialCertificate(credentialValues))
    }
    return result
  }

export const createJobSuccessFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (createJobSuccess.match(action)) {
      const job = extractDataFromPayload(action)
      const credentialItemId = extractCredentialItemIdFromPayload(action)
      dispatch(setJob(job))
      dispatch(setCredentialItemId(credentialItemId))
      //TODO: add navigation as a dependency
      Navigation.navigate(HomeNavigationRoutes.Experience)
      // TODO: this should be handled by the notification module
      notification('success', 'Details saved!')
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
