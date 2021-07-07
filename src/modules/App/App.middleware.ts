import { Middleware } from 'redux'

import { actions as AuthActions } from '../Auth'
import { actions as UserActions } from '../User'
import { fetchInitial, resetAppData } from './App.reducer'

export const appResetFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (resetAppData.match(action)) {
      dispatch(AuthActions.clearAuth())
    }

    return result
  }

export const fetchInitialFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (fetchInitial.match(action)) {
      dispatch(UserActions.fetchUserCredentials())
    }
    return result
  }
