import { Middleware } from 'redux'

// avoiding circular dependencies:
import * as AuthActions from './../Auth/Auth.reducer'
import * as UserActions from './../User/User.reducer'
import { hydrateApp, resetAppData } from './App.reducer'

export const appResetFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (resetAppData.match(action)) {
      dispatch(AuthActions.clearAuth())
      dispatch(UserActions.clearUser())
    }

    return result
  }

export const hydrateAppFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (hydrateApp.match(action)) {
      dispatch(UserActions.fetchUserCredentials())
    }
    return result
  }
