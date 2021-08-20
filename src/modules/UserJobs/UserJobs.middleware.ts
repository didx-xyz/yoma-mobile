import { UserCredentialTypes } from 'api/users/users.types'
import { extractErrorMessageFromPayload } from 'modules/Error/error.utils'
import { HomeNavigationRoutes } from 'modules/HomeNavigation/HomeNavigation.types'
import { createJob } from 'modules/Jobs/Jobs.reducer'
import { selectId } from 'modules/User/User.selector'
import { extractUserCredentialFormValues, prepareUserCredentialItemPayload } from 'modules/User/User.utils'
import { mergeRight } from 'ramda'
import { Middleware } from 'redux'
import { showSimpleMessage } from 'utils/error'
import { extractDataFromPayload, normalise } from 'utils/redux.utils'

import { actions as ApiActions, utils as ApiUtils } from '../../api'
import { constants as ApiUsersConstants } from '../../api/users'
import { Normalise, StdFn } from '../../types/general.types'
import * as Navigation from '../Navigation/Navigation.actions'
import * as UserActions from '../User/User.reducer'
import { UserCredentials } from '../User/User.types'
import {
  createUserJob,
  createUserJobsFailure,
  createUserJobsSuccess,
  getUserJobsSuccess,
  normaliseUserJobsSuccess,
  setUserJobs,
  setUserJobsFormValues,
  updateNormalisedUserJobs,
} from './UserJobs.reducer'
import { selectFormValues } from './UserJobs.selector'
import { NormalisedUserJobs, UserJobCredential } from './UserJobs.types'

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

    if (createUserJob.match(action)) {
      const state = getState()
      const userId = selectId(state)

      const formValues = selectFormValues(state)
      const userJobsPayload = prepareUserCredentialItemPayload(action)(formValues)

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

export const createUserJobsSuccessFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (createUserJobsSuccess.match(action)) {
      const response = extractDataFromPayload(action)
      const normalisedJobs = normalise([response])
      dispatch(updateNormalisedUserJobs(normalisedJobs))
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
