import { actions as AppActions } from 'modules/App'
import { mergeRight } from 'ramda'
import { Middleware } from 'redux'

import { actions as ApiActions } from '../../api'
import { constants as ApiAuthConstants } from '../../api/auth'
import { showSimpleMessage } from '../../utils/error'
import { AuthNavigationRoutes } from '../AuthNavigation/AuthNavigation.types'
import * as NavigationActions from '../Navigation/Navigation.actions'
import { Providers } from '../SSOAuth/SSOAuth.types'
import { selectRegistrationCredentials, selectSocialLoginCredentials } from '../SSOAuth/SSOAuth.utils'
import { SECURE_STORE_REFRESH_TOKEN_KEY } from './Auth.constants'
import {
  authLogin,
  authLoginFailure,
  authLoginSuccess,
  authLogout,
  authRegistration,
  authRegistrationFailure,
  authRegistrationSuccess,
  authSocialLogin,
  authSocialLoginFailure,
  authSocialLoginSuccess,
  authSocialRegistration,
  authSocialRegistrationFailure,
  authSocialRegistrationSuccess,
  setAuthCredentials,
  setSecureRefreshToken,
  setSecureRefreshTokenFailure,
  setSecureRefreshTokenSuccess,
  setUserLoginCredentials,
} from './Auth.reducer'
import { selectLoginCredentials } from './Auth.selector'
import {
  selectCredentialsFromLoginPayload,
  selectLoginCredentialsFromRegistration,
  selectRefreshTokenFromLoginPayload,
} from './Auth.utils'

export const authLoginFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (authLogin.match(action)) {
      dispatch(
        ApiActions.apiRequest(
          mergeRight(ApiAuthConstants.LOGIN_CONFIG, {
            onSuccess: authLoginSuccess,
            onFailure: authLoginFailure,
          }),
          action.payload,
        ),
      )
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
            onSuccess: authLoginSuccess,
            onFailure: authLoginFailure,
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
            onSuccess: authRegistrationSuccess,
            onFailure: authRegistrationFailure,
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

export const authLoginSuccessFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (authLoginSuccess.match(action)) {
      const credentials = selectCredentialsFromLoginPayload(action)
      const refreshToken = selectRefreshTokenFromLoginPayload(action)
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

export const authLoginFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (authLoginFailure.match(action)) {
      // TODO: this should be handled by the notification module
      // @ts-ignore
      notification('danger', 'An error occurred.', action.payload.message)
    }

    return result
  }

export const authLogoutFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (authLogout.match(action)) {
      dispatch(AppActions.resetAppData())
    }

    return result
  }

export const authRegistrationFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    // TODO: Abstract the api calls into a single api middleware
    if (authRegistration.match(action)) {
      const credentials = selectLoginCredentialsFromRegistration(action.payload)
      dispatch(
        ApiActions.apiRequest(
          mergeRight(ApiAuthConstants.REGISTER_CONFIG, {
            onSuccess: authRegistrationSuccess,
            onFailure: authRegistrationFailure,
          }),
          action.payload,
        ),
      )
      dispatch(setUserLoginCredentials(credentials))
    }

    return result
  }

export const authRegistrationSuccessFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  ({ getState, dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (authRegistrationSuccess.match(action)) {
      // TODO: this should be handled by the notification module
      notification('success', 'Registration Successful')
      const credentials = selectLoginCredentials(getState())
      dispatch(authLogin(credentials))
    }
    return result
  }

export const authRegistrationFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)
    if (authRegistrationFailure.match(action)) {
      NavigationActions.navigate(AuthNavigationRoutes.Register)
      // TODO: this should be handled by the notification module
      notification('danger', 'Error', action.payload)
    }

    return result
  }
