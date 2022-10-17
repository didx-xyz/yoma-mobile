import { mergeRight } from 'ramda'

import { API_VERSION_PART } from '../api.constants'
import { ApiClients, ApiMeta, ApiMethods } from '../api.types'

export const WORK_EXPERIENCE_CONFIG: Partial<ApiMeta> = {
  client: ApiClients.WorkExperience,
  method: ApiMethods.Get,
  urlSuffix: API_VERSION_PART,
  isTokenRequired: true,
}

export const WORK_EXPERIENCE_GET_ALL_CONFIG: Partial<ApiMeta> = mergeRight(WORK_EXPERIENCE_CONFIG, {
  endpoint: 'names',
})
export const WORK_EXPERIENCE_EDIT_CONFIG: Partial<ApiMeta> = mergeRight(WORK_EXPERIENCE_CONFIG, {
  method: ApiMethods.Patch,
})
export const WORK_EXPERIENCE_GET_BY_ID_CONFIG: Partial<ApiMeta> = mergeRight(WORK_EXPERIENCE_CONFIG, {})
export const WORK_EXPERIENCE_CREATE_CONFIG: Partial<ApiMeta> = mergeRight(WORK_EXPERIENCE_CONFIG, {
  method: ApiMethods.Post,
})
