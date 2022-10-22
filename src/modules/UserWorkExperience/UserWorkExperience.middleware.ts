import i18n from 'i18next'
import { mergeRight } from 'ramda'
import { Middleware } from 'redux'

import { actions as ApiActions, utils as ApiUtils } from '~/api'
import { constants as ApiUsersConstants } from '~/api/users'
import { UserCredentialTypes } from '~/api/users/users.types'
import * as Strings from '~/constants/strings.constants'
import { extractErrorResponseMessage } from '~/modules/Error/error.utils'
import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'
// importing directly to solve circular references
import * as NavigationTypes from '~/modules/Navigation/Navigation.types'
import * as NavigationUtils from '~/modules/Navigation/Navigation.utils'
import * as UserActions from '~/modules/User/User.reducer'
import * as UserSelectors from '~/modules/User/User.selector'
import { UserCredentials } from '~/modules/User/User.types'
import { extractUserCredentialFormValues, prepareUserCredentialItemPayload } from '~/modules/User/User.utils'
import { NormaliseDependency } from '~/redux/redux.types'
import { extractDataFromResponseAction, normalise } from '~/redux/redux.utils'
import { StdFn } from '~/types/general.types'
import { showSimpleMessage } from '~/utils/error'

import * as WorkExperienceActions from '../WorkExperience/WorkExperience.reducer'
import {
  clearUserWorkExperiencesFormValues,
  createUserWorkExperience,
  createUserWorkExperienceFailure,
  createUserWorkExperienceSuccess,
  fetchUserWorkExperienceById,
  fetchUserWorkExperienceByIdFailure,
  fetchUserWorkExperienceByIdSuccess,
  getUserWorkExperienceSuccess,
  normaliseUserWorkExperienceSuccess,
  setUserWorkExperiences,
  setUserWorkExperiencesFormValues,
  updateUserWorkExperiences,
} from './UserWorkExperience.reducer'
import { selectFormValues } from './UserWorkExperience.selector'
import { UserWorkExperienceCredential } from './UserWorkExperience.types'
import { extractUserWorkExperienceFromData } from './UserWorkExperience.utils'

export const getUserWorkExperiencesFromCredentialsFlow =
  (
    extractDataFromPayload: StdFn<any, UserCredentials>,
    extractWorkExperiences: StdFn<UserCredentials, UserWorkExperienceCredential[]>,
  ): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (UserActions.fetchUserCredentialsSuccess.match(action)) {
      const data = extractDataFromPayload(action)
      const jobs = extractWorkExperiences(data)
      dispatch(getUserWorkExperienceSuccess(jobs))
    }
    return result
  }

export const normaliseUserWorkExperiencesFlow =
  ({ normalise: normalisePayload }: NormaliseDependency<UserWorkExperienceCredential>): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (getUserWorkExperienceSuccess.match(action)) {
      const normalisedWorkExperience = normalisePayload(action.payload)
      dispatch(normaliseUserWorkExperienceSuccess(normalisedWorkExperience))
    }
    return result
  }

export const setUserWorkExperiencesFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (normaliseUserWorkExperienceSuccess.match(action)) {
      dispatch(setUserWorkExperiences(action.payload))
    }
    return result
  }

export const setUserWorkExperiencesFormValuesFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (WorkExperienceActions.createWorkExperience.match(action)) {
      const formValues = extractUserCredentialFormValues(UserCredentialTypes.WorkExperience)(action.payload)
      dispatch(setUserWorkExperiencesFormValues(formValues))
    }
    return result
  }

export const createUserWorkExperienceFlow: Middleware =
  ({ getState, dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (createUserWorkExperience.match(action)) {
      const state = getState()
      const userId = UserSelectors.selectId(state)

      const formValues = selectFormValues(state)
      const userWorkExperiencePayload = prepareUserCredentialItemPayload(action)(formValues)
      const config = ApiUtils.prependValueToEndpointInConfig(ApiUsersConstants.USERS_CREDENTIALS_CREATE_CONFIG)(userId)

      dispatch(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: createUserWorkExperienceSuccess,
            onFailure: createUserWorkExperienceFailure,
          }),
          userWorkExperiencePayload,
        ),
      )
    }
    return result
  }

export const createUserWorkExperienceSuccessFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (createUserWorkExperienceSuccess.match(action)) {
      const data = extractDataFromResponseAction(action)

      dispatch(fetchUserWorkExperienceById(data.id))
      dispatch(clearUserWorkExperiencesFormValues())
    }
    return result
  }

export const createUserWorkExperienceFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (createUserWorkExperienceFailure.match(action)) {
      const errorMessage = extractErrorResponseMessage(action)
      // TODO: this should be handled by the notification module
      notification('danger', i18n.t('general.error'), errorMessage)
    }
    return result
  }

export const fetchUserWorkExperienceByIdFlow: Middleware =
  ({ dispatch, getState }) =>
  next =>
  action => {
    const result = next(action)
    if (fetchUserWorkExperienceById.match(action)) {
      const state = getState()
      const userId = UserSelectors.selectId(state)
      const config = ApiUtils.prependValueToEndpointInConfig(ApiUsersConstants.USERS_CREDENTIALS_GET_BY_TYPE_CONFIG)(
        userId,
      )
      const configWithCredentialId = ApiUtils.appendValueToEndpointArrayInConfig(config)(action.payload)
      dispatch(
        ApiActions.apiRequest(
          mergeRight(configWithCredentialId, {
            onSuccess: fetchUserWorkExperienceByIdSuccess,
            onFailure: fetchUserWorkExperienceByIdFailure,
          }),
        ),
      )
    }
    return result
  }

export const fetchUserWorkExperienceByIdSuccessFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (fetchUserWorkExperienceByIdSuccess.match(action)) {
      const data = extractDataFromResponseAction(action)
      const userWorkExperience = extractUserWorkExperienceFromData(data)
      const normalisedWorkExperience = normalise(userWorkExperience)
      dispatch(updateUserWorkExperiences(normalisedWorkExperience))
      // TODO: this should be handled by the notification module
      notification('success', i18n.t(Strings.DETAILS_SAVED))
      //TODO: add navigation as a dependency
      NavigationUtils.navigate(HomeNavigationRoutes.Home as keyof NavigationTypes.ParamsList)
    }
    return result
  }

export const fetchUserWorkExperienceByIdFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (fetchUserWorkExperienceByIdFailure.match(action)) {
      const errorMessage = extractErrorResponseMessage(action)
      // TODO: this should be handled by the notification module
      notification('danger', i18n.t('general.error'), errorMessage)
    }
    return result
  }
