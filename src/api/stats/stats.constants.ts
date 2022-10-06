import { mergeRight } from 'ramda'

import { API_VERSION_PART } from '~/api/api.constants'

import { ApiClients, ApiMeta, ApiMethods } from '../api.types'
import { StatsEndpoints } from './stats.types'

export const STATS_CONFIG: Partial<ApiMeta> = {
  client: ApiClients.Stats,
  endpoint: StatsEndpoints.Languages,
  method: ApiMethods.Get,
  urlSuffix: API_VERSION_PART,
}

export const LANGUAGES_STATS_CONFIG: Partial<ApiMeta> = mergeRight(STATS_CONFIG, {})
export const COUNTRIES_STATS_CONFIG: Partial<ApiMeta> = mergeRight(STATS_CONFIG, { endpoint: StatsEndpoints.Countries })
export const SKILLS_STATS_CONFIG: Partial<ApiMeta> = mergeRight(STATS_CONFIG, { endpoint: StatsEndpoints.Skills })
