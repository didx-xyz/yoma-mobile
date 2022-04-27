import {
  always,
  append,
  complement,
  concat,
  equals,
  evolve,
  filter,
  flatten,
  ifElse,
  isNil,
  join,
  mergeAll,
  mergeDeepRight,
  objOf,
  of,
  pathOr,
  pipe,
  unless,
  zip,
} from 'ramda'

import { RootState } from '~/redux/redux.types'
import { StdObj } from '~/types/general.types'

import { ApiCall, ApiClientArgs, ApiMeta, PrepareApiRequestData } from './api.types'

export const addValueWithGivenKeyToConfig = (key: string) => (config: Partial<ApiMeta>) =>
  pipe(objOf(key), mergeDeepRight(config))

export const addIdAsEndpointToConfig = addValueWithGivenKeyToConfig('endpoint')
export const prependValueToEndpointInConfig = (config: Partial<ApiMeta>) => (id: string) =>
  evolve({
    endpoint: pipe(of, concat([id])),
  })(config)

export const appendValueToEndpointArrayInConfig = (config: Partial<ApiMeta>) => (id: string) =>
  evolve({
    endpoint: append(id),
  })(config)

export const zipIdsIntoConfigEndpoint = (ids: string[]) =>
  evolve({
    endpoint: pipe(zip(ids), flatten),
  })
export const addParamsToConfig = addValueWithGivenKeyToConfig('params')
export const createParam = objOf
export const createTypeParam = createParam('type')

export const generateSanitisedEndpoint = pipe(flatten, filter(complement(isNil)), join('/'))
export const addHeaders = (headers: StdObj<string>) => pipe(concat([headers]), mergeAll)
export const setAuthTokenHeader = unless(isNil, pipe(concat('Bearer '), objOf('Authorization')))
export const selectAuthToken = pathOr(null, ['auth', 'token'])

export const selectTokenIfRequired = (state: RootState) =>
  ifElse(equals(true), always(selectAuthToken(state)), always(undefined))

export const prepareApiRequest = (state: RootState, action: any): PrepareApiRequestData => {
  //@ts-ignore - will properly type once we get the action with meta data
  const { payload: data, meta } = action
  const { onSuccess, onFailure, isTokenRequired, ...args } = meta

  const token = selectTokenIfRequired(state)(isTokenRequired)
  const apiArgs = {
    token,
    data,
    ...args,
  }
  return { onSuccess, onFailure, apiArgs }
}

export const apiCall: ApiCall =
  instance =>
  ({ urlSuffix, client, endpoint, method, token, data, params, headers, config = {} }: ApiClientArgs) =>
    instance.request({
      method,
      url: generateSanitisedEndpoint([urlSuffix, client, endpoint]),
      data,
      headers: addHeaders({})([headers, setAuthTokenHeader(token)]),
      params,
      ...config,
    })
