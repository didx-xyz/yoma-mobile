import { State } from 'react-native-gesture-handler'
import { Middleware } from 'redux'

import { apiRequest } from './api.reducer'
import { ApiClient, ApiClientArgs, ApiMeta } from './api.types'

type PrepareApiRequestData = Pick<ApiMeta, 'onSuccess' | 'onFailure'> & {
  apiArgs: ApiClientArgs
}

const prepareApiRequestData = (state: State, action: any): PrepareApiRequestData => {
  const getToken = (_s: any) => 'A BEARER TOKEN'
  const { payload: data, meta } = action
  const { onSuccess, onFailure, requiresToken, ...args } = meta

  const token = requiresToken ? getToken(state) : undefined
  const apiArgs = {
    token,
    data,
    ...args,
  }
  return { onSuccess, onFailure, apiArgs }
}

export const apiFlow = (api: ApiClient): Middleware => ({ getState, dispatch }) => next => async action => {
  const result = next(action)

  if (apiRequest.match(action)) {
    const state = getState()
    const { onSuccess, onFailure, apiArgs } = prepareApiRequestData(state, action)

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
