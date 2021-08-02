import { extractErrorMessageFromPayload } from 'modules/Error/error.utils'
import { HomeNavigationRoutes } from 'modules/HomeNavigation/HomeNavigation.types'
import { selectId } from 'modules/User/User.selector'
import { mergeRight } from 'ramda'
import { Middleware } from 'redux'
import { showSimpleMessage } from 'utils/error'

import { actions as ApiActions, utils as ApiUtils } from '../../api'
import { constants as ApiJobConstants } from '../../api/jobs'
import { constants as ApiUsersConstants } from '../../api/users'
import * as Navigation from '../Navigation/Navigation.actions'
import {
  createJob,
  createJobCredentials,
  createJobCredentialsFailure,
  createJobCredentialsSuccess,
  createJobFailure,
  createJobSuccess,
  setTmpFormValues,
} from './Job.reducer'
import { selectJobTmpFormValues } from './Job.selector'
import { JobCredentialsTmpFormValues } from './Job.types'
import { extractJobsCredentialTmpValues, extractJobsFromPayload, prepareJobCredentialPayload } from './Job.utils'

export const createJobFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (createJob.match(action)) {
      dispatch(
        ApiActions.apiRequest(
          mergeRight(ApiJobConstants.JOBS_CREATE_CONFIG, {
            onSuccess: createJobSuccess,
            onFailure: createJobFailure,
          }),
          action.payload,
        ),
      )

      const tmpFormValues = extractJobsCredentialTmpValues(action)
      dispatch(setTmpFormValues(tmpFormValues))
    }
    return result
  }

export const createJobSuccessFlow: Middleware =
  ({ getState, dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (createJobSuccess.match(action)) {
      const state = getState()
      const jobResponsePayload = extractJobsFromPayload(action)
      const tmpFormValues = selectJobTmpFormValues(state) as JobCredentialsTmpFormValues
      console.log('tmpFormValues', tmpFormValues)

      const jobCredentialRequestPayload = prepareJobCredentialPayload(tmpFormValues)(jobResponsePayload)
      dispatch(createJobCredentials(jobCredentialRequestPayload))
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
      const errorMessage = extractErrorMessageFromPayload(action)
      // TODO: this should be handled by the notification module
      notification('danger', 'Error', errorMessage)
    }
    return result
  }

export const createJobCredentialsFlow: Middleware =
  ({ dispatch, getState }) =>
  next =>
  action => {
    const result = next(action)
    if (createJobCredentials.match(action)) {
      const state = getState()
      const userId = selectId(state)
      const config = ApiUtils.prependIdToEndpointInConfig(ApiUsersConstants.USERS_CREDENTIALS_CREATE_CONFIG)(userId)

      dispatch(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: createJobCredentialsSuccess,
            onFailure: createJobCredentialsFailure,
          }),
          action.payload,
        ),
      )
    }
    return result
  }

export const createJobCredentialsSuccessFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (createJobCredentialsSuccess.match(action)) {
      //TODO: add navigation as a dependency
      Navigation.navigate(HomeNavigationRoutes.Experience)
      // TODO: this should be handled by the notification module
      notification('success', 'Details saved!')
    }

    return result
  }

export const createJobCredentialsFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (createJobCredentialsFailure.match(action)) {
      // TODO: this should be handled by the notification module
      notification('danger', 'An error occurred.', 'Oops something went wrong! Please try again.')
    }
    return result
  }
