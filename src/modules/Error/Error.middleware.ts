import { Middleware } from 'redux'

import { actions as ApiActions } from '~/api'

import { unauthorizedError } from './Error.reducer'

export const categorizeErrorsFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (ApiActions.apiError.match(action)) {
      const errorCode = action.payload.data.meta.code
      if (errorCode === 401) {
        dispatch(unauthorizedError())
        return result
      }
      const onFailure = action.meta.onFailure
      const error = action.payload
      dispatch(onFailure(error))
    }

    return result
  }
