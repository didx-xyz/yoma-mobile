import { Middleware } from 'redux'

import * as AuthActions from './../Auth/Auth.reducer'
import { resetAppData } from './App.reducer'

export const appResetFlow: Middleware = ({ dispatch }) => next => action => {
  const result = next(action)

  if (resetAppData.match(action)) {
    dispatch(AuthActions.clearAuth())
  }

  return result
}
