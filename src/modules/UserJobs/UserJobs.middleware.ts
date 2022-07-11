import i18n from 'i18next'
import { mergeRight } from 'ramda'
import { Middleware } from 'redux'

import { actions as ApiActions, utils as ApiUtils } from '~/api'
import { constants as ApiUsersConstants } from '~/api/users'
import { UserCredentialTypes } from '~/api/users/users.types'
import * as Strings from '~/constants/strings.constants'
import { extractErrorResponseMessage } from '~/modules/Error/error.utils'
import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'
import * as JobsActions from '~/modules/Jobs/Jobs.reducer'
import * as Navigation from '~/modules/Navigation/Navigation.utils'
import * as UserActions from '~/modules/User/User.reducer'
import * as UserSelectors from '~/modules/User/User.selector'
import { UserCredentials } from '~/modules/User/User.types'
import { extractUserCredentialFormValues, prepareUserCredentialItemPayload } from '~/modules/User/User.utils'
import { NormaliseDependency } from '~/redux/redux.types'
import { extractDataFromResponseAction, normalise } from '~/redux/redux.utils'
import { StdFn } from '~/types/general.types'
import { showSimpleMessage } from '~/utils/error'

import {
  clearUserJobsFormValues,
  createUserJob,
  createUserJobFailure,
  createUserJobSuccess,
  fetchUserJobById,
  fetchUserJobByIdFailure,
  fetchUserJobByIdSuccess,
  getUserJobsSuccess,
  normaliseUserJobsSuccess,
  setUserJobs,
  setUserJobsFormValues,
  updateUserJobs,
} from './UserJobs.reducer'
import { selectFormValues } from './UserJobs.selector'
import { UserJobCredential } from './UserJobs.types'
import { extractUserJobFromData } from './UserJobs.utils'

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
  ({ normalise: normalisePayload }: NormaliseDependency<UserJobCredential>): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (getUserJobsSuccess.match(action)) {
      const normalisedJobs = normalisePayload(action.payload)
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
    if (JobsActions.createJob.match(action)) {
      const formValues = extractUserCredentialFormValues(UserCredentialTypes.Job)(action.payload)
      dispatch(setUserJobsFormValues(formValues))
    }
    return result
  }

export const createUserJobFlow: Middleware =
  ({ getState, dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (createUserJob.match(action)) {
      const state = getState()
      const userId = UserSelectors.selectId(state)

      const formValues = selectFormValues(state)
      const userJobsPayload = prepareUserCredentialItemPayload(action)(formValues)

      const config = ApiUtils.prependValueToEndpointInConfig(ApiUsersConstants.USERS_CREDENTIALS_CREATE_CONFIG)(userId)

      dispatch(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: createUserJobSuccess,
            onFailure: createUserJobFailure,
          }),
          userJobsPayload,
        ),
      )
    }
    return result
  }

export const createUserJobSuccessFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (createUserJobSuccess.match(action)) {
      const data = extractDataFromResponseAction(action)

      dispatch(fetchUserJobById(data.id))
      dispatch(clearUserJobsFormValues())
    }
    return result
  }

export const createUserJobFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (createUserJobFailure.match(action)) {
      const errorMessage = extractErrorResponseMessage(action)
      // TODO: this should be handled by the notification module
      notification('danger', i18n.t('general.error'), errorMessage)
    }
    return result
  }

export const fetchUserJobByIdFlow: Middleware =
  ({ dispatch, getState }) =>
  next =>
  action => {
    const result = next(action)
    if (fetchUserJobById.match(action)) {
      const state = getState()
      const userId = UserSelectors.selectId(state)
      const config = ApiUtils.prependValueToEndpointInConfig(ApiUsersConstants.USERS_CREDENTIALS_GET_BY_TYPE_CONFIG)(
        userId,
      )
      const configWithCredentialId = ApiUtils.appendValueToEndpointArrayInConfig(config)(action.payload)
      dispatch(
        ApiActions.apiRequest(
          mergeRight(configWithCredentialId, {
            onSuccess: fetchUserJobByIdSuccess,
            onFailure: fetchUserJobByIdFailure,
          }),
        ),
      )
    }
    return result
  }

export const fetchUserJobByIdSuccessFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (fetchUserJobByIdSuccess.match(action)) {
      const data = extractDataFromResponseAction(action)
      const userJob = extractUserJobFromData(data)
      const normalisedJobs = normalise(userJob)
      dispatch(updateUserJobs(normalisedJobs))
      // TODO: this should be handled by the notification module
      notification('success', i18n.t(Strings.DETAILS_SAVED))
      //TODO: add navigation as a dependency
      Navigation.navigate(HomeNavigationRoutes.Home)
    }
    return result
  }

export const fetchUserJobByIdFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (fetchUserJobByIdFailure.match(action)) {
      const errorMessage = extractErrorResponseMessage(action)
      // TODO: this should be handled by the notification module
      notification('danger', i18n.t('general.error'), errorMessage)
    }
    return result
  }
