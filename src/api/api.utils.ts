import {
  identity,
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
} from 'ramda'
import { State } from 'react-native-gesture-handler'

import { apiRequest } from './api.reducer'
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

export const setAuthTokenHeader = unless(isNil, pipe(concat('Bearer '), objOf('Authorization')))
export const getTokenFromState = pathOr(null, ['auth', 'token'])
export const getTokenIfRequired = (state: State) => ifElse(identity, getTokenFromState(state), always(undefined))

export const prepareApiRequest = (state: State, action: typeof apiRequest): PrepareApiRequestData => {
  //TODO: figure out the typings for an action with meta data
  //@ts-ignore
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
  config = {},
}: ApiClientArgs) =>
  instance.request({
    method,
    url: generateSanitisedEndpoint([client, endpoint]),
    data,
    headers: setAuthTokenHeader(token),
    params,
    ...config,
  })
