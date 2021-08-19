import { UserCredentialTypes } from 'api/users/users.types'
import { extractErrorMessageFromPayload } from 'modules/Error/error.utils'
import { HomeNavigationRoutes } from 'modules/HomeNavigation/HomeNavigation.types'
import { createJob } from 'modules/Jobs/Jobs.reducer'
import { selectId } from 'modules/User/User.selector'
import { mergeRight } from 'ramda'
import { Middleware } from 'redux'
import { showSimpleMessage } from 'utils/error'
import {
  extractDataFromPayload,
  extractNormalisedEntitiesFromState,
  extractUpdatedNormalisedState,
  normalise,
} from 'utils/redux.utils'

import { actions as ApiActions, utils as ApiUtils } from '../../api'
import { constants as ApiUsersConstants } from '../../api/users'
import { Normalise, StdFn } from '../../types/general.types'
import * as Navigation from '../Navigation/Navigation.actions'
import * as UserActions from '../User/User.reducer'
import { UserCredentials } from '../User/User.types'
import {
  createUserJobs,
  createUserJobsFailure,
  createUserJobsSuccess,
  getUserJobsSuccess,
  normaliseUserJobsSuccess,
  setUserJobs,
  setUserJobsFormValues,
  updateNormalisedUserJobsState,
} from './UserJobs.reducer'
import { selectUserJobs, selectUserJobsFormValues } from './UserJobs.selector'
import { NormalisedUserJobs, UserJobCredential } from './UserJobs.types'
import { extractUserCredentialFormValues, extractUserJobsPayload } from './UserJobs.utils'

export const getUserJobsFromCredentialsFlow =
  (
    extractDataFromPayload: StdFn<any, UserCredentials>,
    extractJobs: StdFn<UserCredentials, UserJobCredential[]>,
  ): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (UserActions.fetchUserCredentialsSuccess.match(action)) {
      const data = extractDataFromPayload(action)
      const jobs = extractJobs(data)
      dispatch(getUserJobsSuccess(jobs))
    }
    return result
  }

export const normaliseUserJobsFlow =
  (normalise: Normalise<UserJobCredential, NormalisedUserJobs>): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (getUserJobsSuccess.match(action)) {
      const normalisedJobs = normalise(action.payload)
      dispatch(normaliseUserJobsSuccess(normalisedJobs))
    }
    return result
  }

export const setUserJobsFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (normaliseUserJobsSuccess.match(action)) {
      dispatch(setUserJobs(action.payload))
    }
    return result
  }
export const setUserJobsFormValuesFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (createJob.match(action)) {
      const formValues = extractUserCredentialFormValues(UserCredentialTypes.Job)(action)
      dispatch(setUserJobsFormValues(formValues))
    }
    return result
  }
export const createUserJobsFlow: Middleware =
  ({ getState, dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (createUserJobs.match(action)) {
      const state = getState()
      const userId = selectId(state)

      const formValues = selectUserJobsFormValues(state)
      const userJobsPayload = extractUserJobsPayload(action)(formValues)

      const config = ApiUtils.prependIdToEndpointInConfig(ApiUsersConstants.USERS_CREDENTIALS_CREATE_CONFIG)(userId)

      dispatch(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: createUserJobsSuccess,
            onFailure: createUserJobsFailure,
          }),
          userJobsPayload,
        ),
      )
    }
    return result
  }

export const createUserJobsSuccessFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (createUserJobsSuccess.match(action)) {
      const response = extractDataFromPayload(action)
      const normalisedJobs = normalise([response])
      dispatch(updateNormalisedUserJobsState(normalisedJobs))
    }
    return result
  }

export const updateNormalisedUserJobsStateFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  ({ getState, dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (updateNormalisedUserJobsState.match(action)) {
      const state = getState()
      const userJobs = selectUserJobs(state)
      const normalisedStateEntities = extractNormalisedEntitiesFromState(userJobs)
      const updatedState = extractUpdatedNormalisedState(action.payload, normalisedStateEntities)

      dispatch(setUserJobs(updatedState))
      //TODO: add navigation as a dependency
      Navigation.navigate(HomeNavigationRoutes.Experience)
      // TODO: this should be handled by the notification module
      notification('success', 'Details saved!')
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
