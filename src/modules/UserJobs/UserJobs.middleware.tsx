import { extractErrorMessageFromPayload } from 'modules/Error/error.utils'
import { HomeNavigationRoutes } from 'modules/HomeNavigation/HomeNavigation.types'
import { selectId } from 'modules/User/User.selector'
import { mergeRight } from 'ramda'
import { Middleware } from 'redux'
import { showSimpleMessage } from 'utils/error'
import { extractDataFromPayload, normalise } from 'utils/redux.utils'

import { actions as ApiActions, utils as ApiUtils } from '../../api'
import { constants as ApiUserJobsConstants } from '../../api/jobs'
import { constants as ApiUsersConstants } from '../../api/users'
import * as Navigation from '../Navigation/Navigation.actions'
import {
  createUserJobs,
  createUserJobsCredentials,
  createUserJobsCredentialsFailure,
  createUserJobsCredentialsSuccess,
  createUserJobsFailure,
  createUserJobsSuccess,
  fetchUserJobsCredentialById,
  setTmpFormValues,
  setUserJobsEntities,
  updateUserJobs,
  updateUserJobsCredentials,
  updateUserJobsCredentialsFailure,
  updateUserJobsCredentialsSuccess,
  updateUserJobsFailure,
  updateUserJobsSuccess,
} from './UserJobs.reducer'
import { selectUserJobsCredentialIdFromTmpFormValues, selectUserJobsTmpFormValues } from './UserJobs.selector'
import { UserJobsCredentialsTmpFormValues } from './UserJobs.types'
import {
  extractUserJobsCredentialId,
  extractUserJobsCredentialRequestPayload,
  extractUserJobsCredentialTmpFormValues,
  extractUserJobsCredentialUpdatePayload,
  extractUserJobsId,
} from './UserJobs.utils'

export const createUserJobsFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (createUserJobs.match(action)) {
      dispatch(
        ApiActions.apiRequest(
          mergeRight(ApiUserJobsConstants.JOBS_CREATE_CONFIG, {
            onSuccess: createUserJobsSuccess,
            onFailure: createUserJobsFailure,
          }),
          action.payload,
        ),
      )

      const tmpFormValues = extractUserJobsCredentialTmpFormValues(action)
      dispatch(setTmpFormValues(tmpFormValues))
    }
    return result
  }

export const createUserJobsSuccessFlow: Middleware =
  ({ getState, dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (createUserJobsSuccess.match(action)) {
      const state = getState()
      const jobResponsePayload = extractDataFromPayload(action)
      const tmpFormValues = selectUserJobsTmpFormValues(state) as UserJobsCredentialsTmpFormValues

      const jobCredentialRequestPayload = extractUserJobsCredentialRequestPayload(tmpFormValues)(jobResponsePayload)
      dispatch(createUserJobsCredentials(jobCredentialRequestPayload))
    }
    return result
  }

export const createUserJobsFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (createUserJobsFailure.match(action)) {
      const errorMessage = extractErrorMessageFromPayload(action)
      // TODO: this should be handled by the notification module
      notification('danger', 'Error', errorMessage)
    }
    return result
  }

export const createUserJobsCredentialsFlow: Middleware =
  ({ dispatch, getState }) =>
  next =>
  action => {
    const result = next(action)
    if (createUserJobsCredentials.match(action)) {
      const state = getState()
      const userId = selectId(state)
      const config = ApiUtils.prependIdToEndpointInConfig(ApiUsersConstants.USERS_CREDENTIALS_CREATE_CONFIG)(userId)

      dispatch(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: createUserJobsCredentialsSuccess,
            onFailure: createUserJobsCredentialsFailure,
          }),
          action.payload,
        ),
      )
    }
    return result
  }

export const createUserJobsCredentialsSuccessFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (createUserJobsCredentialsSuccess.match(action)) {
      const jobs = extractDataFromPayload(action)
      dispatch(setUserJobsEntities(normalise(jobs)))
      //TODO: add navigation as a dependency
      Navigation.navigate(HomeNavigationRoutes.Experience)
      // TODO: this should be handled by the notification module
      notification('success', 'Details saved!')
    }

    return result
  }

export const createUserJobsCredentialsFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (createUserJobsCredentialsFailure.match(action)) {
      // TODO: this should be handled by the notification module
      notification('danger', 'An error occurred.', 'Oops something went wrong! Please try again.')
    }
    return result
  }

export const updateUserJobsFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (updateUserJobs.match(action)) {
      const jobId = extractUserJobsId(action)
      dispatch(
        ApiActions.apiRequest(
          mergeRight(ApiUserJobsConstants.JOBS_EDIT_CONFIG, {
            onSuccess: updateUserJobsSuccess,
            onFailure: updateUserJobsFailure,
            endpoint: jobId,
          }),
          action.payload,
        ),
      )

      const tmpFormValues = extractUserJobsCredentialTmpFormValues(action)
      dispatch(setTmpFormValues(tmpFormValues))
    }
    return result
  }

export const updateUserJobsSuccessFlow: Middleware =
  ({ getState, dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (updateUserJobsSuccess.match(action)) {
      const state = getState()
      const tmpFormValues = selectUserJobsTmpFormValues(state) as UserJobsCredentialsTmpFormValues
      dispatch(updateUserJobsCredentials(tmpFormValues))
    }
    return result
  }

export const updateUserJobsFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (updateUserJobsFailure.match(action)) {
      const errorMessage = extractErrorMessageFromPayload(action)
      // TODO: this should be handled by the notification module
      notification('danger', 'Error', errorMessage)
    }
    return result
  }

export const fetchUserJobsCredentialByIdFlow: Middleware =
  ({ dispatch, getState }) =>
  next =>
  action => {
    const result = next(action)
    if (fetchUserJobsCredentialById.match(action)) {
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
            onSuccess: updateUserJobsCredentialsSuccess,
            onFailure: updateUserJobsCredentialsFailure,
          }),
        ),
      )
    }
    return result
  }

export const updateUserJobsCredentialsFlow: Middleware =
  ({ dispatch, getState }) =>
  next =>
  action => {
    const result = next(action)
    if (updateUserJobsCredentials.match(action)) {
      const state = getState()
      const userId = selectId(state)
      const jobCredentialId = extractUserJobsCredentialId(action)
      const jobCredentialUpdatePayload = extractUserJobsCredentialUpdatePayload(action)
      const configWithUserId = ApiUtils.prependIdToEndpointInConfig(ApiUsersConstants.USERS_CREDENTIALS_EDIT_CONFIG)(
        userId,
      )
      const config = ApiUtils.appendIdToEndpointInConfig(configWithUserId)(jobCredentialId)

      dispatch(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: updateUserJobsCredentialsSuccess,
            onFailure: updateUserJobsCredentialsFailure,
          }),
          jobCredentialUpdatePayload,
        ),
      )
    }
    return result
  }

export const updateUserJobsCredentialsSuccessFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  ({ getState, dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (updateUserJobsCredentialsSuccess.match(action)) {
      const state = getState()
      const jobCredentialId = selectUserJobsCredentialIdFromTmpFormValues(state)
      dispatch(fetchUserJobsCredentialById(jobCredentialId))
      //TODO: add navigation as a dependency
      Navigation.navigate(HomeNavigationRoutes.Experience)
      // TODO: this should be handled by the notification module
      notification('success', 'Details saved!')
    }

    return result
  }

export const updateUserJobsCredentialsFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (updateUserJobsCredentialsFailure.match(action)) {
      // TODO: this should be handled by the notification module
      notification('danger', 'An error occurred.', 'Oops something went wrong! Please try again.')
    }
    return result
  }
