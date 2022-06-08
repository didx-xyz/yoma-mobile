import { types as ApiTypes } from '~/api'

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
  meta: ApiTypes.ApiResponseMeta
}

export interface OrganisationsState extends NormalisedOrganisations {}
