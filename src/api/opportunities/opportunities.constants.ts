import { mergeRight } from 'ramda'

import { API_VERSION_PART } from '~/api/api.constants'

import { ApiClients, ApiMeta, ApiMethods } from '../api.types'
import { OpportunitiesEndpoints } from './opportunities.types'

export const OPPORTUNITIES_CONFIG: Partial<ApiMeta> = {
  client: ApiClients.Opportunities,
  endpoint: OpportunitiesEndpoints.YomaListOpportunity,
  method: ApiMethods.Get,
  urlSuffix: API_VERSION_PART,
  isTokenRequired: true,
  headers: {
    OrganisationId: '6BAF2197-8F85-4289-477D-08D92E9CC88C',
    yomapartnerToken: '7F9DF1BC-10B8-445C-0C3A-08D81D3203ED',
  },
}

export const OPPORTUNITIES_GET_ALL_CONFIG: Partial<ApiMeta> = mergeRight(OPPORTUNITIES_CONFIG, {})
