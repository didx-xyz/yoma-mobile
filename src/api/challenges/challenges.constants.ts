import { mergeRight } from 'ramda'

import { API_VERSION_PART } from '../api.constants'
import { ApiClients, ApiMeta, ApiMethods } from '../api.types'

export const CHALLENGES_CONFIG: Partial<ApiMeta> = {
  client: ApiClients.Challenges,
  method: ApiMethods.Get,
  urlSuffix: API_VERSION_PART,
  isTokenRequired: true,
}

export const CHALLENGES_GET_ALL_CONFIG: Partial<ApiMeta> = mergeRight(CHALLENGES_CONFIG, {})
