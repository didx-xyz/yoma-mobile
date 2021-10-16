import { mergeRight } from 'ramda'
import { Middleware } from 'redux'

import { actions as ApiActions, utils as ApiUtils } from '../../api'
import { constants as ApiUsersConstants } from '../../api/users'
import { UserCredentialTypes } from '../../api/users/users.types'
import { NormaliseDependency } from '../../redux/redux.types'
import { extractDataFromResponseAction } from '../../redux/redux.utils'
import { StdFn } from '../../types/general.types'
import { showSimpleMessage } from '../../utils/error'
import { extractErrorResponseMessage } from '../Error/error.utils'
import { HomeNavigationRoutes } from '../HomeNavigation/HomeNavigation.types'
import * as Navigation from '../Navigation/Navigation.actions'
import * as QualificationsActions from '../Qualifications/Qualifications.reducer'
import * as UserActions from '../User/User.reducer'
import * as UserSelectors from '../User/User.selector'
import { UserCredentials } from '../User/User.types'
import { extractUserCredentialFormValues, prepareUserCredentialItemPayload } from '../User/User.utils'
import {
  clearUserQualificationFormValues,
  createUserQualification,
  createUserQualificationFailure,
  createUserQualificationSuccess,
  setUserQualificationFormValues,
  updateUserQualifications,
} from './UserQualifications.reducer'
import {
  getUserQualificationsSuccess,
  normaliseUserQualificationsSuccess,
  setUserQualifications,
} from './UserQualifications.reducer'
import { selectFormValues } from './UserQualifications.selector'
import { UserQualification } from './UserQualifications.types'

export const getUserQualificationsFromCredentialsFlow =
  (
    extractDataFromPayload: StdFn<any, UserCredentials>,
    extractQualifications: StdFn<UserCredentials, UserQualification[]>,
  ): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (UserActions.fetchUserCredentialsSuccess.match(action)) {
      const data = extractDataFromPayload(action)
      const qualifications = extractQualifications(data)
      dispatch(getUserQualificationsSuccess(qualifications))
    }
    return result
  }

export const normaliseUserQualificationsFlow =
  ({ normalise }: NormaliseDependency<UserQualification>): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (getUserQualificationsSuccess.match(action)) {
      const normalisedChallenges = normalise(action.payload)
      dispatch(normaliseUserQualificationsSuccess(normalisedChallenges))
    }
    return result
  }

export const setUserQualificationsFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (normaliseUserQualificationsSuccess.match(action)) {
      dispatch(setUserQualifications(action.payload))
    }
    return result
  }

export const setUserQualificationsFormValuesFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (QualificationsActions.createQualification.match(action)) {
      const formValues = extractUserCredentialFormValues(UserCredentialTypes.Qualification)(action.payload)
      dispatch(setUserQualificationFormValues(formValues))
    }
    return result
  }

export const createUserQualificationFlow: Middleware =
  ({ getState, dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (createUserQualification.match(action)) {
      const state = getState()
      const userId = UserSelectors.selectId(state)

      const formValues = selectFormValues(state)
      const userQualificationsPayload = prepareUserCredentialItemPayload(action)(formValues)

      const config = ApiUtils.prependValueToEndpointInConfig(ApiUsersConstants.USERS_CREDENTIALS_CREATE_CONFIG)(userId)

      dispatch(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: createUserQualificationSuccess,
            onFailure: createUserQualificationFailure,
          }),
          userQualificationsPayload,
        ),
      )
    }
    return result
  }

export const createUserQualificationSuccessFlow =
  ({ normalise }: NormaliseDependency<UserQualification>): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (createUserQualificationSuccess.match(action)) {
      const data = extractDataFromResponseAction(action)
      const normalised = normalise([data])
      dispatch(updateUserQualifications(normalised))
      dispatch(clearUserQualificationFormValues())
      Navigation.navigate(HomeNavigationRoutes.Home)
    }
    return result
  }

export const createUserQualificationFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (createUserQualificationFailure.match(action)) {
      const errorMessage = extractErrorResponseMessage(action)
      // TODO: this should be handled by the notification module
      notification('danger', 'Error', errorMessage)
    }
    return result
  }
