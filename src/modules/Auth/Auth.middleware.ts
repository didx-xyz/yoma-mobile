import { isAnyOf } from '@reduxjs/toolkit'
import { mergeRight } from 'ramda'
import { authorize as oAuthAuthorize } from 'react-native-app-auth'
import { Middleware } from 'redux'

import oAuthConfig from '~/oauth'

import { actions as ApiActions } from '../../api'
import { constants as ApiAuthConstants } from '../../api/auth'
import { showSimpleMessage } from '../../utils/error'
// avoiding circular dependencies:
import * as AppActions from '../App/App.reducer'
import { actions as ErrorActions } from '../Error'
import { Providers } from '../SSOAuth/SSOAuth.types'
import { selectRegistrationCredentials, selectSocialLoginCredentials } from '../SSOAuth/SSOAuth.utils'
import { selectors as UserSelectors } from '../User'
import { SECURE_STORE_REFRESH_TOKEN_KEY } from './Auth.constants'
import {
  authSocialLogin,
  authSocialLoginFailure,
  authSocialLoginSuccess,
  authSocialRegistration,
  authSocialRegistrationFailure,
  authSocialRegistrationSuccess,
  authorize,
  authorizeWithRefreshTokenFailure,
  authorizeWithRefreshTokenSuccess,
  deleteSecureRefreshToken,
  deleteSecureRefreshTokenFailure,
  deleteSecureRefreshTokenSuccess,
  getSecureRefreshToken,
  getSecureRefreshTokenFailure,
  getSecureRefreshTokenSuccess,
  login,
  loginFailure,
  loginSuccess,
  logout,
  noRefreshTokenInSecureStore,
  register,
  registerFailure,
  registerSuccess,
  setAuthCredentials,
  setSecureRefreshToken,
  setSecureRefreshTokenFailure,
  setSecureRefreshTokenSuccess,
  setUserLoginCredentials,
} from './Auth.reducer'
import { selectLoginCredentials } from './Auth.selector'
import { SecureStorageRefreshToken } from './Auth.types'
import {
  extractCredentialsFromAuthorizedPayload,
  extractMessageFromErrorPayload,
  extractRefreshTokenFromAuthorizedPayload,
  selectLoginCredentialsFromRegistration,
} from './Auth.utils'

export const authorizeFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (authorize.match(action)) {
      dispatch(getSecureRefreshToken())
    }
    return result
  }

export const getSecureRefreshTokenFlow =
  (getSecureItem: any): Middleware =>
  ({ dispatch }) =>
  next =>
  async action => {
    const result = next(action)
    if (getSecureRefreshToken.match(action)) {
      await getSecureItem(SECURE_STORE_REFRESH_TOKEN_KEY)
        .then((data: SecureStorageRefreshToken) => {
          data === null ? dispatch(noRefreshTokenInSecureStore()) : dispatch(getSecureRefreshTokenSuccess(data))
        })
        .catch((error: any) => dispatch(getSecureRefreshTokenFailure(error.message)))
    }
    return result
  }

export const authorizeWithRefreshTokenFlow: Middleware =
  ({ dispatch, getState }) =>
  next =>
  action => {
    const result = next(action)
    if (getSecureRefreshTokenSuccess.match(action)) {
      const state = getState()
      const userId = UserSelectors.selectId(state)
      const refreshToken = action.payload
      dispatch(
        ApiActions.apiRequest(
          mergeRight(ApiAuthConstants.SESSION_CONFIG, {
            onSuccess: authorizeWithRefreshTokenSuccess,
            onFailure: authorizeWithRefreshTokenFailure,
          }),
          { userId, refreshToken },
        ),
      )
    }

    return result
  }

export const authorizeWithRefreshTokenFailureFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (isAnyOf(authorizeWithRefreshTokenFailure, noRefreshTokenInSecureStore, getSecureRefreshTokenFailure)(action)) {
      dispatch(logout())
    }

    return result
  }

export const loginFlow: Middleware =
  ({ dispatch }) =>
  next =>
  async action => {
    const result = next(action)

    if (login.match(action)) {
      const result = await oAuthAuthorize(oAuthConfig)
      console.log(result)
      // dispatch(loginSuccess(result))
    }

    return result
  }

export const authSocialLoginFlow =
  ({ ssoAuth }: { ssoAuth: Function; notification: typeof showSimpleMessage }): Middleware =>
  ({ dispatch }) =>
  next =>
  async action => {
    const result = next(action)
    if (authSocialLogin.match(action)) {
      try {
        const authProvider = action.payload as Providers
        const authData = await ssoAuth(authProvider)
        if (authData !== false) {
          const credentials = selectSocialLoginCredentials(authProvider, authData)
          dispatch(authSocialLoginSuccess(credentials))
        }
      } catch (error) {
        dispatch(authSocialLoginFailure(error.message))
      }
    }
    return result
  }

export const authSocialLoginSuccessFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (authSocialLoginSuccess.match(action)) {
      dispatch(
        ApiActions.apiRequest(
          mergeRight(ApiAuthConstants.LOGIN_SOCIAL_CONFIG, {
            onSuccess: loginSuccess,
            onFailure: loginFailure,
          }),
          action.payload,
        ),
      )
    }

    return result
  }

export const authSocialRegistrationFlow =
  ({ ssoAuth }: { ssoAuth: Function }): Middleware =>
  ({ dispatch }) =>
  next =>
  async action => {
    const result = next(action)
    if (authSocialRegistration.match(action)) {
      try {
        const authProvider = action.payload as Providers
        const authData = await ssoAuth(authProvider)
        if (authData !== false) {
          const credentials = selectRegistrationCredentials(authProvider, authData)
          dispatch(authSocialRegistrationSuccess(credentials))
        }
      } catch (error) {
        dispatch(authSocialRegistrationFailure(error.message))
      }
    }
    return result
  }

export const authSocialRegistrationSuccessFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (authSocialRegistrationSuccess.match(action)) {
      dispatch(
        ApiActions.apiRequest(
          mergeRight(ApiAuthConstants.REGISTER_SOCIAL_CONFIG, {
            onSuccess: registerSuccess,
            onFailure: registerFailure,
          }),
          action.payload,
        ),
      )
    }
    return result
  }

export const authSocialRegistrationFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (authSocialRegistrationFailure.match(action)) {
      // TODO: this should be handled by the notification module
      // @ts-ignore
      notification('danger', 'An error occurred.', action.payload)
    }

    return result
  }

export const authSocialLoginFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (authSocialLoginFailure.match(action)) {
      // TODO: this should be handled by the notification module
      // @ts-ignore
      notification('danger', 'An error occurred.', action.payload)
    }

    return result
  }

export const authorizeSuccessFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (isAnyOf(loginSuccess, authorizeWithRefreshTokenSuccess)(action)) {
      const credentials = extractCredentialsFromAuthorizedPayload(action)
      const refreshToken = extractRefreshTokenFromAuthorizedPayload(action)
      dispatch(setAuthCredentials(credentials))
      dispatch(setSecureRefreshToken(refreshToken))
      dispatch(AppActions.hydrateApp())
    }
    return result
  }

export const setSecureRefreshTokenFlow =
  (setSecureItem: any): Middleware =>
  ({ dispatch }) =>
  next =>
  async action => {
    const result = next(action)
    if (setSecureRefreshToken.match(action)) {
      await setSecureItem(SECURE_STORE_REFRESH_TOKEN_KEY, action.payload)
        .then(() => {
          dispatch(setSecureRefreshTokenSuccess())
        })
        .catch((error: any) => {
          dispatch(setSecureRefreshTokenFailure(error))
        })
    }
    return result
  }

export const loginFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (loginFailure.match(action)) {
      // TODO: this should be handled by the notification module
      // @ts-ignore
      notification('danger', 'An error occurred.', action.payload.message)
    }

    return result
  }

export const logoutFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (logout.match(action)) {
      dispatch(AppActions.resetAppData())
      dispatch(deleteSecureRefreshToken())
    }

    return result
  }

export const deleteSecureRefreshTokenFlow =
  (deleteSecureItem: any): Middleware =>
  ({ dispatch }) =>
  next =>
  async action => {
    const result = next(action)

    if (deleteSecureRefreshToken.match(action)) {
      await deleteSecureItem(SECURE_STORE_REFRESH_TOKEN_KEY)
        .then(() => {
          dispatch(deleteSecureRefreshTokenSuccess())
        })
        .catch((error: any) => {
          dispatch(deleteSecureRefreshTokenFailure(error))
        })
    }

    return result
  }

export const registrationFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (register.match(action)) {
      const credentials = selectLoginCredentialsFromRegistration(action.payload)
      dispatch(
        ApiActions.apiRequest(
          mergeRight(ApiAuthConstants.REGISTER_CONFIG, {
            onSuccess: registerSuccess,
            onFailure: registerFailure,
          }),
          action.payload,
        ),
      )
      dispatch(setUserLoginCredentials(credentials))
    }

    return result
  }

export const registrationSuccessFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  ({ getState, dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (registerSuccess.match(action)) {
      // TODO: this should be handled by the notification module
      notification('success', 'Registration Successful')
      const credentials = selectLoginCredentials(getState())
      dispatch(login(credentials))
    }
    return result
  }

export const registrationFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)
    if (registerFailure.match(action)) {
      const message = extractMessageFromErrorPayload(action)
      notification('danger', 'Error', message)
    }

    return result
  }

export const unauthorizedFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (ErrorActions.unauthorizedError.match(action)) {
      dispatch(authorize())
    }

    return result
  }
