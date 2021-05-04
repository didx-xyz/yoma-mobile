import { Middleware } from 'redux'

import { apiGet, apiGetFailure, apiGetSuccess } from './api.reducer'

export const apiGetFlow = ({ api }: { api: any }): Middleware => ({ getState, dispatch }) => next => async action => {
  const result = next(action)

  if (apiGet.match(action)) {
    enum ApiServices {
      Auth = 'auth',
    }

    enum AuthEndpoints {
      Login = 'login',
    }

    const meta = {
      service: ApiServices.Auth,
      endpoint: AuthEndpoints.Login,
      requiresToken: true,
      onSuccess: apiGetSuccess,
      onFailure: apiGetFailure,
    }
    const state = getState()
    const getToken = (_s: any) => 'A BEARER TOKEN'
    // need to be able to apiGet from any given endpoint
    // using the default axios instance
    // should handle get and push (and other methods)

    await api(meta.service, meta.endpoint, meta.requiresToken && getToken(state))
      .get(action.payload)
      .then((response: any) => {
        dispatch(apiGetSuccess(response))
      })
      .catch((error: any) => {
        dispatch(apiGetFailure(error))
      })
  }

  return result
}
