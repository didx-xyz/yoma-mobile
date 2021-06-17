import { Middleware } from 'redux'

import { apiRequest } from './api.reducer'
import { ApiClient } from './api.types'
import { prepareApiRequest } from './api.utils'

type Deps = { api: ApiClient; prepArgs: typeof prepareApiRequest }
export const apiFlow = ({ api, prepArgs }: Deps): Middleware => ({ getState, dispatch }) => next => async action => {
  const result = next(action)

  if (apiRequest.match(action)) {
    const state = getState()
    //@ts-ignore
    const { onSuccess, onFailure, apiArgs } = prepArgs(state, action)

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
