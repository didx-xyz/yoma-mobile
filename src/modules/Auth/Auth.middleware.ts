import { isAnyOf } from '@reduxjs/toolkit'
import { actions as AppActions } from 'modules/App'
import { mergeRight } from 'ramda'
import { Middleware } from 'redux'

import { actions as ApiActions } from '../../api'
import { constants as ApiAuthConstants } from '../../api/auth'
import { showSimpleMessage } from '../../utils/error'
import { AuthNavigationRoutes } from '../AuthNavigation/AuthNavigation.types'
import * as NavigationActions from '../Navigation/Navigation.actions'
import { selectors as UserSelectors } from '../User'
import { SECURE_STORE_REFRESH_TOKEN_KEY } from './Auth.constants'
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  register,
  registerFailure,
  registerSuccess,
  authWithRefreshTokenFailure,
  authWithRefreshTokenSuccess,
  getSecureRefreshToken,
  getSecureRefreshTokenFailure,
  getSecureRefreshTokenSuccess,
  setAuthCredentials,
  setSecureRefreshToken,
  setSecureRefreshTokenFailure,
  setSecureRefreshTokenSuccess,
  setUserLoginCredentials,
  authorize,
  noRefreshTokenInSecureStore,
  deleteSecureRefreshToken,
  deleteSecureRefreshTokenSuccess,
  deleteSecureRefreshTokenFailure,
} from './Auth.reducer'
import { selectLoginCredentials } from './Auth.selector'
import { SecureStorageRefreshToken } from './Auth.types'
import {
  extractCredentialsFromAuthorizedPayload,
  selectLoginCredentialsFromRegistration,
  extractRefreshTokenFromAuthorizedPayload,
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
            onSuccess: authWithRefreshTokenSuccess,
            onFailure: authWithRefreshTokenFailure,
          }),
          { userId, refreshToken },
        ),
      )
    }

    return result
  }

export const authWithRefreshTokenFailureFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (isAnyOf(authWithRefreshTokenFailure, noRefreshTokenInSecureStore, getSecureRefreshTokenFailure)(action)) {
      dispatch(logout())
    }

    return result
  }

export const loginFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (login.match(action)) {
      dispatch(
        ApiActions.apiRequest(
          mergeRight(ApiAuthConstants.LOGIN_CONFIG, {
            onSuccess: loginSuccess,
            onFailure: loginFailure,
          }),
          action.payload,
        ),
      )
    }

    return result
  }

export const authorizeSuccessFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (isAnyOf(loginSuccess, authWithRefreshTokenSuccess)(action)) {
      const credentials = extractCredentialsFromAuthorizedPayload(action)
      const refreshToken = extractRefreshTokenFromAuthorizedPayload(action)
      notification('success', 'Login Successful')
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
      NavigationActions.navigate(AuthNavigationRoutes.Register)
      // TODO: this should be handled by the notification module
      notification('danger', 'Error', action.payload)
    }

    return result
  }
