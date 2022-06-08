import { mergeRight } from 'ramda'

import { API_VERSION_PART } from '~/api/api.constants'

import { ApiClients, ApiMeta, ApiMethods } from '../api.types'

export const QUALIFICATIONS_CONFIG: Partial<ApiMeta> = {
  client: ApiClients.Qualifications,
  method: ApiMethods.Post,
  urlSuffix: API_VERSION_PART,
  isTokenRequired: true,
}

export const QUALIFICATIONS_CREATE_CONFIG: Partial<ApiMeta> = mergeRight(QUALIFICATIONS_CONFIG, {})
