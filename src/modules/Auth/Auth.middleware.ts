import { Middleware } from 'redux'

import { showSimpleMessage } from '../../utils/error'
import { SECURE_STORE_REFRESH_TOKEN_KEY } from './Auth.constants'
import {
  authLogin,
  authLoginFailure,
  authLoginSuccess,
  authRegistration,
  authRegistrationFailure,
  authRegistrationSuccess,
  setAuthCredentials,
  setSecureRefreshTokenFailure,
  setSecureRefreshTokenSuccess,
} from './Auth.reducer'
import {
  AuthLoginFailureResponse,
  AuthLoginSuccessResponse,
  AuthRegistrationFailureResponse,
  AuthRegistrationSuccessResponse,
} from './Auth.types'
import { selectCredentialsFromLoginPayload, selectRefreshTokenFromLoginPayload } from './Auth.utils'

export const authLoginFlow =
  ({ api }: { api: any }): Middleware =>
  ({ dispatch }) =>
  next =>
  async action => {
    const result = next(action)

    // TODO: Abstract the api calls into a single api middleware
    if (authLogin.match(action)) {
      await api.auth
        .login(action.payload)
        .then((response: AuthLoginSuccessResponse) => {
          dispatch(authLoginSuccess(response))
        })
        .catch((error: AuthLoginFailureResponse) => {
          dispatch(authLoginFailure(error))
        })
    }

    return result
  }

export const authSetCredentialsFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  ({ dispatch }) =>
  next =>
  async action => {
    const result = next(action)

    if (authLoginSuccess.match(action)) {
      const credentials = selectCredentialsFromLoginPayload(action)
      notification('success', 'Login Successful')
      dispatch(setAuthCredentials(credentials))
    }
    return result
  }

export const setSecureRefreshTokenFlow =
  (setSecureItem: any): Middleware =>
  ({ dispatch }) =>
  next =>
  async action => {
    const result = next(action)
    if (authLoginSuccess.match(action)) {
      const refreshToken = selectRefreshTokenFromLoginPayload(action)
      await setSecureItem(SECURE_STORE_REFRESH_TOKEN_KEY, refreshToken)
        .then(() => {
          dispatch(setSecureRefreshTokenSuccess())
        })
        .catch((error: any) => {
          dispatch(setSecureRefreshTokenFailure(error))
        })
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
      notification('danger', 'Error', action.payload)
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
