import { Middleware } from 'redux'

import { actions as AuthActions } from '../Auth'
import { actions as CredentialsActions } from '../Credentials'
import { actions as UserActions } from '../User'
import { hydrateApp, resetAppData } from './App.reducer'

export const appResetFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (resetAppData.match(action)) {
      dispatch(AuthActions.clearAuth())
      dispatch(UserActions.clearUser())
      dispatch(CredentialsActions.clearCredentials())
    }

    return result
  }

export const hydrateAppFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (hydrateApp.match(action)) {
      dispatch(CredentialsActions.fetchUserCredentials())
    }
    return result
  }
