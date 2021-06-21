import { Middleware } from 'redux'

import * as AuthActions from './../Auth/Auth.reducer'
import { resetAppData } from './App.reducer'

export const appResetFlow: Middleware = ({ dispatch }) => next => async action => {
  const result = next(action)

  if (resetAppData.match(action)) {
    dispatch(AuthActions.clearAuthState)
  }

  return result
}
