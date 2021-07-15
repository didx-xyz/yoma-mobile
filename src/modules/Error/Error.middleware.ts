import { Middleware } from 'redux'

import { actions as ApiActions } from '../../api'
import { unauthorizedError } from './Error.reducer'

export const categorizeErrorsFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (ApiActions.apiError.match(action)) {
      if (action.payload.meta.code === 401) {
        dispatch(unauthorizedError())
      }
    }

    return result
  }
