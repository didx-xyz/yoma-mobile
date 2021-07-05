import { authLoginSuccess } from 'modules/Auth/Auth.reducer'
import { mergeRight } from 'ramda'
import { Middleware } from 'redux'
import { showSimpleMessage } from 'utils/error'

import { actions as ApiActions } from '../../api'
import { constants as ApiUserConstants } from '../../api/users'
import {
  setUserCredentials,
  updateUserCredentials,
  updateUserCredentialsFailure,
  updateUserCredentialsSuccess,
} from './User.reducer'
import { selectUserUpdateCredentials } from './User.selector'
import {
  selectUserCredentialsFromLoginPayload,
  selectUserCredentialsFromUpdatePayload,
  selectUserIdFromUserCredentials,
} from './User.utils'

export const setUserOnAuthFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (authLoginSuccess.match(action)) {
      const credentials = selectUserCredentialsFromLoginPayload(action)
      dispatch(setUserCredentials(credentials))
    }
    return result
  }

export const updateUserCredentialsFlow: Middleware =
  ({ getState, dispatch }) =>
  next =>
  async action => {
    const result = next(action)
    if (updateUserCredentials.match(action)) {
      const state = getState()
      const userId = selectUserIdFromUserCredentials(state)
      const credentials = selectUserUpdateCredentials(action)(state)
      dispatch(
        ApiActions.apiRequest(
          mergeRight(ApiUserConstants.USERS_EDIT_CONFIG, {
            onSuccess: updateUserCredentialsSuccess,
            onFailure: updateUserCredentialsFailure,
            endpoint: userId,
          }),
          credentials,
        ),
      )
    }
    return result
  }

export const updateUserCredentialsSuccessFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (updateUserCredentialsSuccess.match(action)) {
      const credentials = selectUserCredentialsFromUpdatePayload(action)
      dispatch(setUserCredentials(credentials))
      // TODO: this should be handled by the notification module
      notification('success', 'Details Updated')
    }
    return result
  }

export const updateUserCredentialsFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (updateUserCredentialsFailure.match(action)) {
      // TODO: this should be handled by the notification module
      notification('danger', 'An error occurred.', action.payload)
    }
    return result
  }
