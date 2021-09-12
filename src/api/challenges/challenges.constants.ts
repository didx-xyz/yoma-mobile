import { mergeRight } from 'ramda'

import { ApiClients, ApiMeta, ApiMethods } from '../api.types'

export const CHALLENGES_CONFIG: Partial<ApiMeta> = {
  client: ApiClients.Challenges,
  method: ApiMethods.Get,
  isTokenRequired: true,
}

export const CHALLENGES_GET_ALL_CONFIG: Partial<ApiMeta> = mergeRight(CHALLENGES_CONFIG, {})
