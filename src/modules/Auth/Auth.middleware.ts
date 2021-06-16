import { mergeRight } from 'ramda'
import { Middleware } from 'redux'

import { actions as ApiActions } from '../../api'
import { constants as ApiAuthConstants } from '../../api/auth'
import { showSimpleMessage } from '../../utils/error'
import {
  authLogin,
  authLoginFailure,
  authLoginSuccess,
  authRegistration,
  authRegistrationFailure,
  authRegistrationSuccess,
  setAuthCredentials,
} from './Auth.reducer'
import { AuthRegistrationFailureResponse, AuthRegistrationSuccessResponse } from './Auth.types'
import { getCredentialsFromAuthSuccess } from './Auth.utils'

export const authLoginFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (authLogin.match(action)) {
      dispatch(
        ApiActions.apiRequest(
          mergeRight(ApiAuthConstants.LOGIN_CONFIG, {
            isTokenRequired: false,
            onSuccess: authLoginSuccess,
            onFailure: authLoginFailure,
          }),
          action.payload,
        ),
      )
    }

    return result
  }

// TODO: add middleware to just get the auth values from authLoginSuccess
// TODO: Then add middleware to get the middleware for state
// TODO: Then add middleware to store the refresh token in secure storage
// TODO: also add middleware in the User section to catch the user data returned in successful auth
export const authSetCredentialsFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  ({ dispatch }) =>
  next =>
  async action => {
    const result = next(action)

    if (authLoginSuccess.match(action)) {
      const credentials = getCredentialsFromAuthSuccess(action)
      // TODO: this should be handled by the notification module
      notification('success', 'Login Successful')
      dispatch(setAuthCredentials(credentials))
    }
    return result
  }

export const authLoginFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  async action => {
    const result = next(action)

    if (authLoginFailure.match(action)) {
      // TODO: this should be handled by the notification module
      // @ts-ignore
      notification('danger', 'An error occurred.', action.payload.message)
    }

    return result
  }

export const authRegistrationFlow =
  ({ api }: { api: any }): Middleware =>
  ({ dispatch }) =>
  next =>
  async action => {
    const result = next(action)

    // TODO: Abstract the api calls into a single api middleware
    if (authRegistration.match(action)) {
      await api.auth
        .register(action.payload)
        .then((response: AuthRegistrationSuccessResponse) => {
          dispatch(authRegistrationSuccess(response))
        })
        .catch((error: AuthRegistrationFailureResponse) => {
          dispatch(authRegistrationFailure(error))
        })
    }

    return result
  }

export const authRegistrationSuccessFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  async action => {
    const result = next(action)

    if (authRegistrationSuccess.match(action)) {
      // TODO: this should be handled by the notification module
      notification('success', 'Registration Successful')
    }

    return result
  }

export const authRegistrationFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  async action => {
    const result = next(action)

    if (authRegistrationFailure.match(action)) {
      // TODO: this should be handled by the notification module
      notification('danger', 'Error', action.payload)
    }

    return result
  }
