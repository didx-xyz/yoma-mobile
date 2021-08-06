import { mergeRight } from 'ramda'

import { ApiClients, ApiMeta, ApiMethods } from '../api.types'
import { SkillsEndpoints } from './skills.types'

export const SKILLS_CONFIG: Partial<ApiMeta> = {
  client: ApiClients.Skills,
  method: ApiMethods.Get,
  isTokenRequired: true,
}

export const SKILLS_GET_ALL_CONFIG: Partial<ApiMeta> = mergeRight(SKILLS_CONFIG, {})
export const SKILLS_GET_KEY_NAMES_CONFIG: Partial<ApiMeta> = mergeRight(SKILLS_CONFIG, {
  endpoint: SkillsEndpoints.Names,
})
export const SKILLS_GET_BY_ID_CONFIG: Partial<ApiMeta> = mergeRight(SKILLS_CONFIG, {})
export const SKILLS_CREATE_CONFIG: Partial<ApiMeta> = mergeRight(SKILLS_CONFIG, {
  method: ApiMethods.Post,
})
