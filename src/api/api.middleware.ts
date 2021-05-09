import { Middleware } from 'redux'

import { apiRequest } from './api.reducer'
import { ApiClient } from './api.types'
import { prepareApiRequest } from './api.utils'

export const apiFlow = (api: ApiClient): Middleware => ({ getState, dispatch }) => next => async action => {
  const result = next(action)

  if (apiRequest.match(action)) {
    const state = getState()
    const { onSuccess, onFailure, apiArgs } = prepareApiRequest(state, action)

    await api(apiArgs)
      .then((response: any) => {
        dispatch(onSuccess(response))
      })
      .catch((error: any) => {
        dispatch(onFailure(error))
      })
  }

  return result
}
