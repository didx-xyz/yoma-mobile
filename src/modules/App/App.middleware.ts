import { Middleware } from 'redux'

import { resetAppData } from './App.reducer'
import { AppResetActions } from './App.types'

export const appResetFlow = (appResetActions: AppResetActions): Middleware => ({
  dispatch,
}) => next => async action => {
  const result = next(action)

  if (resetAppData.match(action)) {
    appResetActions.forEach(resetReducer => dispatch(resetReducer))
  }

  return result
}
