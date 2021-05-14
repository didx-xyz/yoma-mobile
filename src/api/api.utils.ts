import {
  concat,
  evolve,
  filter,
  flatten,
  isNil,
  join,
  mergeDeepRight,
  objOf,
  of,
  pathOr,
  pipe,
  unless,
  complement,
  always,
  ifElse,
  equals,
  mergeAll,
} from 'ramda'

import { RootState } from '../redux/redux.types'
import { StdObj } from '../types/general.types'
import { ApiClientArgs, ApiMeta, ApiCall, GenerateEndpoint, PrepareApiRequestData } from './api.types'

export const generateEndpoint: GenerateEndpoint = join('/')

export const addValueWithGivenKeyToConfig = (key: string) => (config: Partial<ApiMeta>) =>
  pipe(objOf(key), mergeDeepRight(config))

export const addIdAsEndpointToConfig = addValueWithGivenKeyToConfig('endpoint')
export const addIdBeforeEndpointInConfig = (config: Partial<ApiMeta>) => (id: number) =>
  evolve({
    endpoint: pipe(of, concat([id])),
  })(config)
export const addParamsToConfig = addValueWithGivenKeyToConfig('params')
export const createParam = objOf
export const createTypeParam = createParam('type')

export const generateSanitisedEndpoint = pipe(flatten, filter(complement(isNil)), join('/'))
export const addHeaders = (headers: StdObj<string>) => pipe(concat([headers]), mergeAll)
export const setAuthTokenHeader = unless(isNil, pipe(concat('Bearer '), objOf('Authorization')))
export const getTokenFromState = pathOr(null, ['auth', 'token'])

export const getTokenIfRequired = (state: RootState) =>
  ifElse(equals(true), always(getTokenFromState(state)), always(undefined))

export const prepareApiRequest = (state: RootState, action: any): PrepareApiRequestData => {
  //@ts-ignore - will properly type once we get the action with meta data
  const { payload: data, meta } = action
  const { onSuccess, onFailure, isTokenRequired, ...args } = meta

  const token = getTokenIfRequired(state)(isTokenRequired)
  const apiArgs = {
    token,
    data,
    ...args,
  }
  return { onSuccess, onFailure, apiArgs }
}

export const apiCall: ApiCall = instance => ({
  client,
  endpoint,
  method,
  token,
  data,
  params,
  headers,
  config = {},
}: ApiClientArgs) =>
  instance.request({
    method,
    url: generateSanitisedEndpoint([client, endpoint]),
    data,
    headers: addHeaders({})([headers, setAuthTokenHeader(token)]),
    params,
    ...config,
  })
