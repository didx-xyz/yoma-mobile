import { mergeRight } from 'ramda'
import { Middleware } from 'redux'

import { actions as ApiActions, utils as ApiUtils } from '~/api'
import { constants as ApiUsersConstants, types as ApiUsersTypes } from '~/api/users'
import { NormaliseDependency } from '~/redux/redux.types'
import * as ReduxUtils from '~/redux/redux.utils'
import * as GeneralTypes from '~/types/general.types'
import { showSimpleMessage } from '~/utils/error'

import { utils as ErrorUtils } from '../Error'
import { HomeNavigationRoutes } from '../HomeNavigation/HomeNavigation.types'
import { utils as NavigationUtils } from '../Navigation'
import { actions as QualificationsActions } from '../Qualifications'
import { actions as UserActions, selectors as UserSelectors, types as UserTypes, utils as UserUtils } from '../User'
import {
  clearUserQualificationFormValues,
  createUserQualification,
  createUserQualificationFailure,
  createUserQualificationSuccess,
  getUserQualificationsSuccess,
  normaliseUserQualificationsSuccess,
  setUserQualificationFormValues,
  setUserQualifications,
  updateUserQualifications,
} from './UserQualifications.reducer'
import { selectFormValues } from './UserQualifications.selector'
import { UserQualification } from './UserQualifications.types'

export const getUserQualificationsFromCredentialsFlow =
  (
    extractDataFromPayload: GeneralTypes.StdFn<any, UserTypes.UserCredentials>,
    extractQualifications: GeneralTypes.StdFn<UserTypes.UserCredentials, UserQualification[]>,
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
      const formValues = UserUtils.extractUserCredentialFormValues(ApiUsersTypes.UserCredentialTypes.Qualification)(
        action.payload,
      )
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
      const userQualificationsPayload = UserUtils.prepareUserCredentialItemPayload(action)(formValues)

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
      const data = ReduxUtils.extractDataFromResponseAction(action)
      const normalised = normalise([data])
      dispatch(updateUserQualifications(normalised))
      dispatch(clearUserQualificationFormValues())
      NavigationUtils.navigate(HomeNavigationRoutes.Home)
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
      const errorMessage = ErrorUtils.extractErrorResponseMessage(action)
      // TODO: this should be handled by the notification module
      notification('danger', 'Error', errorMessage)
    }
    return result
  }
