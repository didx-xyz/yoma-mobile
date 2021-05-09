import { __, concat, evolve, filter, flatten, isNil, join, mergeDeepRight, not, objOf, of, pipe } from 'ramda'
import { State } from 'react-native-gesture-handler'

import { ApiClientArgs, ApiMeta, ApiRequest, GenerateEndpoint, PrepareApiRequestData } from './api.types'

export const generateEndpoint: GenerateEndpoint = join('/')

export const addValueWithGivenKeyToConfig = (key: string) => (config: Partial<ApiMeta>) =>
  pipe(objOf(key), mergeDeepRight(config))

export const addIdAsEndpointToConfig = addValueWithGivenKeyToConfig('endpoint')
export const addIdToEndpointInConfig = (config: Partial<ApiMeta>) => (id: number) =>
  evolve({
    endpoint: pipe(of, concat(__, [id])),
  })(config)
export const addParamsToConfig = addValueWithGivenKeyToConfig('params')
export const createParam = (key: string) => objOf(key)
export const typeParam = createParam('type')

export const generateSanitisedEndpoint = pipe(filter(not(isNil)), flatten, join('/'))

export const setAuthToken = (token?: string) => (token ? { Authorization: `Bearer ${token}` } : undefined)

export const apiRequest: ApiRequest = instance => ({
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
    headers: setAuthToken(token),
    params,
    ...config,
  })

export const prepareApiRequest = (state: State, action: any): PrepareApiRequestData => {
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
