import { authLoginSuccess } from 'modules/Auth/Auth.reducer'
import {
  fetchUserCredentials,
  fetchUserCredentialsFailure,
  fetchUserCredentialsSuccess,
} from 'modules/Credentials/Credentials.reducer'
import Navigation from 'modules/Navigation'
import { selectId } from 'modules/User/User.selector'
import { mergeRight } from 'ramda'
import { Middleware } from 'redux'
import { showSimpleMessage } from 'utils/error'

import { actions as ApiActions, utils as ApiUtils } from '../../api'
import { constants as ApiUsersConstants } from '../../api/users'
import { HomeNavigationRoutes } from '../HomeNavigation/HomeNavigation.types'
import {
  createCredentials,
  setCredentials,
  updateCredentials,
  updateCredentialsFailure,
  updateCredentialsSuccess,
} from './Credentials.reducer'
import { extractCredentialsFromHydratePayload } from './Credentials.utils'

export const setCredentialsFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (authLoginSuccess.match(action)) {
      const user = extractCredentialsFromHydratePayload(action)
      dispatch(setCredentials(user))
    }
    return result
  }

export const fetchUserCredentialsFlow: Middleware =
  ({ dispatch, getState }) =>
  next =>
  action => {
    const result = next(action)
    if (fetchUserCredentials.match(action)) {
      const state = getState()
      const userId = selectId(state)
      const config = ApiUtils.prependIdToEndpointInConfig(ApiUsersConstants.USERS_CREDENTIALS_GET_BY_ID_CONFIG)(userId)
      dispatch(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: fetchUserCredentialsSuccess,
            onFailure: fetchUserCredentialsFailure,
          }),
          action.payload,
        ),
      )
    }
    return result
  }

export const createCredentialsFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (createCredentials.match(action)) {
      dispatch(
        ApiActions.apiRequest(
          mergeRight(ApiUsersConstants.USERS_CREDENTIALS_CREATE_CONFIG, {
            onSuccess: updateCredentialsSuccess,
            onFailure: updateCredentialsFailure,
          }),
          action.payload,
        ),
      )
    }
    return result
  }

export const updateCredentialsFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (updateCredentials.match(action)) {
      dispatch(
        ApiActions.apiRequest(
          mergeRight(ApiUsersConstants.USERS_CREDENTIALS_CREATE_CONFIG, {
            onSuccess: updateCredentialsSuccess,
            onFailure: updateCredentialsFailure,
          }),
          action.payload,
        ),
      )
    }
    return result
  }
export const updateCredentialsSuccessFlow =
  ({
    notification,
    navigation,
  }: {
    notification: typeof showSimpleMessage
    navigation: typeof Navigation
  }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (updateCredentialsSuccess.match(action)) {
      navigation.navigate(HomeNavigationRoutes.Home)
      // TODO: this should be handled by the notification module
      notification('success', 'Details Updated')
    }
    return result
  }

export const updateCredentialsFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (updateCredentialsFailure.match(action)) {
      // TODO: this should be handled by the notification module
      notification('danger', 'An error occurred.', 'Oops something went wrong! Please try again.')
    }
    return result
  }

export const createCredentialsSuccessFlow =
  ({
    notification,
    navigation,
  }: {
    notification: typeof showSimpleMessage
    navigation: typeof Navigation
  }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (updateCredentialsSuccess.match(action)) {
      navigation.navigate(HomeNavigationRoutes.Home)
      // TODO: this should be handled by the notification module
      notification('success', 'Details Saved')
    }
    return result
  }

export const createCredentialsFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (updateCredentialsFailure.match(action)) {
      // TODO: this should be handled by the notification module
      notification('danger', 'An error occurred.', 'Oops something went wrong! Please try again.')
    }
    return result
  }
