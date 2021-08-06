import { extractPayloadData } from 'api/api.utils'
import { extractErrorMessageFromPayload } from 'modules/Error/error.utils'
import { HomeNavigationRoutes } from 'modules/HomeNavigation/HomeNavigation.types'
import { selectId } from 'modules/User/User.selector'
import { mergeRight } from 'ramda'
import { Middleware } from 'redux'
import { showSimpleMessage } from 'utils/error'
import { normalise } from 'utils/redux.utils'

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
  fetchJobCredentialById,
  setJobEntities,
  setTmpFormValues,
  updateJob,
  updateJobCredentials,
  updateJobCredentialsFailure,
  updateJobCredentialsSuccess,
  updateJobFailure,
  updateJobSuccess,
} from './Job.reducer'
import { selectJobCredentialIdFromTmpFormValues, selectJobTmpFormValues } from './Job.selector'
import { JobCredentialsTmpFormValues } from './Job.types'
import {
  extractJobCredentialId,
  extractJobCredentialRequestPayload,
  extractJobCredentialUpdatePayload,
  extractJobId,
  extractJobsCredentialTmpFormValues,
} from './Job.utils'

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

      const tmpFormValues = extractJobsCredentialTmpFormValues(action)
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
      const jobResponsePayload = extractPayloadData(action)
      const tmpFormValues = selectJobTmpFormValues(state) as JobCredentialsTmpFormValues

      const jobCredentialRequestPayload = extractJobCredentialRequestPayload(tmpFormValues)(jobResponsePayload)
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
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (createJobCredentialsSuccess.match(action)) {
      const jobs = extractPayloadData(action)
      dispatch(setJobEntities(normalise(jobs)))
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

export const updateJobFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (updateJob.match(action)) {
      const jobId = extractJobId(action)
      dispatch(
        ApiActions.apiRequest(
          mergeRight(ApiJobConstants.JOBS_EDIT_CONFIG, {
            onSuccess: updateJobSuccess,
            onFailure: updateJobFailure,
            endpoint: jobId,
          }),
          action.payload,
        ),
      )

      const tmpFormValues = extractJobsCredentialTmpFormValues(action)
      dispatch(setTmpFormValues(tmpFormValues))
    }
    return result
  }

export const updateJobSuccessFlow: Middleware =
  ({ getState, dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (updateJobSuccess.match(action)) {
      const state = getState()
      const tmpFormValues = selectJobTmpFormValues(state) as JobCredentialsTmpFormValues
      dispatch(updateJobCredentials(tmpFormValues))
    }
    return result
  }

export const updateJobFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (updateJobFailure.match(action)) {
      const errorMessage = extractErrorMessageFromPayload(action)
      // TODO: this should be handled by the notification module
      notification('danger', 'Error', errorMessage)
    }
    return result
  }

export const fetchJobCredentialByIdFlow: Middleware =
  ({ dispatch, getState }) =>
  next =>
  action => {
    const result = next(action)
    if (fetchJobCredentialById.match(action)) {
      const state = getState()
      const userId = selectId(state)

      const credentialId = action.payload
      const configWithUserId = ApiUtils.prependIdToEndpointInConfig(
        ApiUsersConstants.USERS_CREDENTIALS_GET_BY_ID_CONFIG,
      )(userId)
      const config = ApiUtils.appendIdToEndpointInConfig(configWithUserId)(credentialId)

      dispatch(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: updateJobCredentialsSuccess,
            onFailure: updateJobCredentialsFailure,
          }),
        ),
      )
    }
    return result
  }

export const updateJobCredentialsFlow: Middleware =
  ({ dispatch, getState }) =>
  next =>
  action => {
    const result = next(action)
    if (updateJobCredentials.match(action)) {
      const state = getState()
      const userId = selectId(state)
      const jobCredentialId = extractJobCredentialId(action)
      const jobCredentialUpdatePayload = extractJobCredentialUpdatePayload(action)
      const configWithUserId = ApiUtils.prependIdToEndpointInConfig(ApiUsersConstants.USERS_CREDENTIALS_EDIT_CONFIG)(
        userId,
      )
      const config = ApiUtils.appendIdToEndpointInConfig(configWithUserId)(jobCredentialId)

      dispatch(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: updateJobCredentialsSuccess,
            onFailure: updateJobCredentialsFailure,
          }),
          jobCredentialUpdatePayload,
        ),
      )
    }
    return result
  }

export const updateJobCredentialsSuccessFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  ({ getState, dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (updateJobCredentialsSuccess.match(action)) {
      const state = getState()
      const jobCredentialId = selectJobCredentialIdFromTmpFormValues(state)
      dispatch(fetchJobCredentialById(jobCredentialId))
      //TODO: add navigation as a dependency
      Navigation.navigate(HomeNavigationRoutes.Experience)
      // TODO: this should be handled by the notification module
      notification('success', 'Details saved!')
    }

    return result
  }

export const updateJobCredentialsFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (updateJobCredentialsFailure.match(action)) {
      // TODO: this should be handled by the notification module
      notification('danger', 'An error occurred.', 'Oops something went wrong! Please try again.')
    }
    return result
  }
