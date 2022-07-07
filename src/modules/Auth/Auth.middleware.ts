import { isAnyOf } from '@reduxjs/toolkit'
import { mergeRight } from 'ramda'
import { authorize as OAuthAuthorize } from 'react-native-app-auth'
import { Middleware } from 'redux'

import { actions as ApiActions } from '~/api'
import { ApiErrorResponse } from '~/api/api.types'
import { constants as ApiAuthConstants } from '~/api/auth'
import { showSimpleMessage } from '~/utils/error'

// avoiding circular dependencies:
import * as AppActions from '../App/App.reducer'
import { actions as ErrorActions } from '../Error'
import { selectors as UserSelectors } from '../User'
import { SECURE_STORE_REFRESH_TOKEN_KEY } from './Auth.constants'
import {
  authorize,
  authorizeWithRefreshTokenFailure,
  authorizeWithRefreshTokenSuccess,
  deleteSecureRefreshToken,
  deleteSecureRefreshTokenFailure,
  deleteSecureRefreshTokenSuccess,
  fetchUserFromOAuth,
  fetchUserFromOAuthFailure,
  fetchUserFromOAuthSuccess,
  getSecureRefreshToken,
  getSecureRefreshTokenFailure,
  getSecureRefreshTokenSuccess,
  login,
  loginFailure,
  loginSuccess,
  logout,
  noRefreshTokenInSecureStore,
  setAuthCredentials,
  setSecureRefreshToken,
  setSecureRefreshTokenFailure,
  setSecureRefreshTokenSuccess,
} from './Auth.reducer'
import { OAuthLoginSuccessResponse, SecureStorageRefreshToken } from './Auth.types'
import {
  extractCredentialsFromAuthorizedPayload,
  extractRefreshTokenFromAuthorizedPayload,
  prepareCredentials,
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
      try {
        const token: SecureStorageRefreshToken = await getSecureItem(SECURE_STORE_REFRESH_TOKEN_KEY)
        if (token === null) {
          dispatch(noRefreshTokenInSecureStore())
          return result
        }
        dispatch(getSecureRefreshTokenSuccess(token))
      } catch (error: any) {
        const errorMessage = error.message || 'There has been an error'
        dispatch(getSecureRefreshTokenFailure(errorMessage))
      }
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
      try {
        const response: OAuthLoginSuccessResponse = await OAuthAuthorize(ApiAuthConstants.OAUTH_SETUP_CONFIG)
        dispatch(loginSuccess(response))
      } catch (error) {
        dispatch(loginFailure(error))
      }
    }

    return result
  }

export const authorizeSuccessFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (isAnyOf(loginSuccess, authorizeWithRefreshTokenSuccess)(action)) {
      const credentialsRaw = extractCredentialsFromAuthorizedPayload(action)
      const credentials = prepareCredentials(credentialsRaw)
      const refreshToken = extractRefreshTokenFromAuthorizedPayload(action)
      dispatch(setAuthCredentials(credentials))
      dispatch(setSecureRefreshToken(refreshToken))
      dispatch(fetchUserFromOAuth())
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

export const fetchUserFromOAuthFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (fetchUserFromOAuth.match(action)) {
      dispatch(
        ApiActions.apiRequest(
          mergeRight(ApiAuthConstants.USER_INFO_CONFIG, {
            onSuccess: fetchUserFromOAuthSuccess,
            onFailure: fetchUserFromOAuthFailure,
          }),
        ),
      )
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
