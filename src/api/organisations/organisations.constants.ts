import { mergeRight } from 'ramda'

import { API_VERSION_PART } from '~/api/api.constants'

import { ApiClients, ApiMeta, ApiMethods } from '../api.types'
import { OrganisationsEndpoints } from './organisations.types'

export const ORGANISATIONS_CONFIG: Partial<ApiMeta> = {
  client: ApiClients.Organisations,
  method: ApiMethods.Get,
  urlSuffix: API_VERSION_PART,
  isTokenRequired: true,
}

export const ORGANISATIONS_GET_ALL_CONFIG: Partial<ApiMeta> = mergeRight(ORGANISATIONS_CONFIG, {})
export const ORGANISATIONS_GET_KEY_NAMES_CONFIG: Partial<ApiMeta> = mergeRight(ORGANISATIONS_CONFIG, {
  endpoint: OrganisationsEndpoints.Names,
})
export const ORGANISATIONS_GET_BY_ID_CONFIG: Partial<ApiMeta> = mergeRight(ORGANISATIONS_CONFIG, {})
export const ORGANISATIONS_CREATE_CONFIG: Partial<ApiMeta> = mergeRight(ORGANISATIONS_CONFIG, {
  method: ApiMethods.Post,
})
