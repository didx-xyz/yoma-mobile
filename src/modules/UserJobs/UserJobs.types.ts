import { ApiResponseMeta } from '~/api/api.types'
import * as UserTypes from '~/modules/User/User.types'

export interface UserJob {
  organisationURL: string
  organisationPrimaryContactName: string
  organisationPrimaryContactEmail: string
  organisationPrimaryContactPhone: string
  organisationId: string
  organisationName: string
  organisationLogoURL: string | null
  id: string
  title: string
  description: string
  skills: string[]
  countries: string[]
  createdAt: string
  createdByAdmin: boolean
  language: string
  published: boolean
}

export interface UserJobFormFields {
  title: string
  description: string
  language: string
  published: boolean
  skillNames: string[]
  organisationId: string
  startTime: string | null
  endTime: string | null
}

interface UserJobOpportunityCredential extends UserJob, UserTypes.OpportunityCredentialPartial {}

export interface UserJobCredential extends UserTypes.UserCredentialMeta {
  opportunity: UserJobOpportunityCredential
}
export interface UserJobsResponse {
  data: { data: UserJobCredential }
  meta: ApiResponseMeta
}

export interface NormalisedUserJobs {
  ids: string[]
  entities: Record<string, UserJobCredential>
}

export interface UserJobsState extends NormalisedUserJobs {
  formValues: UserTypes.UserCredentialFormValues | {}
}
