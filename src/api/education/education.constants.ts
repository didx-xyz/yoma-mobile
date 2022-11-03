import { mergeRight } from 'ramda'

import { API_VERSION_PART } from '~/api/api.constants'

import { ApiClients, ApiMeta, ApiMethods } from '../api.types'

export const EDUCATION_CONFIG: Partial<ApiMeta> = {
  client: ApiClients.Education,
  method: ApiMethods.Post,
  urlSuffix: API_VERSION_PART,
  isTokenRequired: true,
}

export const EDUCATION_CREATE_CONFIG: Partial<ApiMeta> = mergeRight(EDUCATION_CONFIG, {})
