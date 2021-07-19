import { omit } from 'ramda'
import { Middleware } from 'redux'

import { apiError, apiRequest } from './api.reducer'
import { ApiFlowDependencies } from './api.types'

export const apiFlow =
  ({ api, prepArgs }: ApiFlowDependencies): Middleware =>
  ({ getState, dispatch }) =>
  next =>
  async action => {
    const result = next(action)

    if (apiRequest.match(action)) {
      const state = getState()
      //@ts-ignore
      const { onSuccess, onFailure, apiArgs } = prepArgs(state, action)
      await api(apiArgs)
        .then((response: any) => {
          const serializableResponse = omit(['config', 'request'], response)
          dispatch(onSuccess(serializableResponse))
        })
        .catch((error: any) => {
          const serializableResponse = omit(['config', 'request'], error.response)
          dispatch(apiError({ onFailure }, serializableResponse))
        })
    }

    return result
  }
