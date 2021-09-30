import { ApiMetaResponse } from '~/modules/Auth/Auth.types'

export type Organisation = {
  key: string
  value: string
}

export type NormalisedOrganisations = {
  ids: string[]
  entities: Record<string, Organisation>
}

export type OrganisationsResponse = {
  data: { data: Organisation[] }
  meta: ApiMetaResponse
}

export interface OrganisationsState extends NormalisedOrganisations {}
