import { types as ApiTypes } from '~/api'
import { ApiResponseHeaders } from '~/api/api.types'
import { NormalisedData } from '~/redux/redux.types'

export interface opportunities {
  [x: string]: any
  value: any | null
  skills: string[] | null
  countries: string[] | null
  language: string | null
  unverifiedCredentials?: number | null
  approvedCredentials?: number | null
  rejectedCredentials: number | null
  totalZLTORewarded: number | null
  skillsLearned: number | null
  organisationId: string | null
  organisationName: string | null
  organisationLogoURL: string | null
  organisationURL: string | null
  organisationPrimaryContactName: string | null
  organisationPrimaryContactEmail: string | null
  organisationPrimaryContactPhone: number | null
  id: string
  title: string | null
  description: string | null
  instructions: string | null
  url: string | null
  createdAt: string | null
  zltoReward: number | null
  createdByAdmin: boolean
  difficulty: string | null
  published: boolean | null
  timeValue: string | null
  timePeriod: string | null
  startTime: string | null
  endTime: string | null
}

export interface OpportunitiesResponse {
  data: { data: opportunities }
  meta: ApiTypes.ApiResponseMeta
  headers: {
    OrganisationId: '6BAF2197-8F85-4289-477D-08D92E9CC88C'
    yomapartnerToken: '7F9DF1BC-10B8-445C-0C3A-08D81D3203ED'
  }
}

export type NormalisedOpportunities = NormalisedData<opportunities>
// export type NormalisedOpportunities = {
//   ids: string[]
//   entities: Record<string, opportunities>
// }

export interface opportunitiesResponseHeaders extends ApiResponseHeaders {
  OrganisationId: string
  yomapartnerToken: string
}
export type OpportunitiesState = opportunities
