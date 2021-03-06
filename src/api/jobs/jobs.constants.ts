import { mergeRight } from 'ramda'

import { API_VERSION_PART } from '~/api/api.constants'

import { ApiClients, ApiMeta, ApiMethods } from '../api.types'

export const JOBS_CONFIG: Partial<ApiMeta> = {
  client: ApiClients.Jobs,
  method: ApiMethods.Get,
  urlSuffix: API_VERSION_PART,
  isTokenRequired: true,
}

export const JOBS_GET_ALL_CONFIG: Partial<ApiMeta> = mergeRight(JOBS_CONFIG, {})
export const JOBS_EDIT_CONFIG: Partial<ApiMeta> = mergeRight(JOBS_CONFIG, {
  method: ApiMethods.Patch,
})
export const JOBS_GET_BY_ID_CONFIG: Partial<ApiMeta> = mergeRight(JOBS_CONFIG, {})
export const JOBS_CREATE_CONFIG: Partial<ApiMeta> = mergeRight(JOBS_CONFIG, {
  method: ApiMethods.Post,
})
