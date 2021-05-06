import { filter, flatten, isNil, join, not, pipe } from 'ramda'

import { ApiRequest, GenerateEndpoint } from './api.types'

export const generateEndpoint: GenerateEndpoint = join('/')

export const generateSanitisedEndpoint = pipe(filter(not(isNil)), flatten, join('/'))

export const setAuthToken = (token?: string) => (token ? { Authorization: `Bearer ${token}` } : undefined)

export const apiRequest: ApiRequest = instance => client => endpoint => method => token => (data, config = {}) =>
  instance.request({
    method,
    url: generateSanitisedEndpoint([client, endpoint, data?.endpoints]),
    data,
    headers: setAuthToken(token),
    ...config,
  })
