import { UserCredentialTypes } from 'api/users/users.types'
import { ApiMetaResponse } from 'modules/Auth/Auth.types'

import { UserCredentialMeta } from '../User/User.types'

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

export interface UserJobCredential extends UserCredentialMeta {
  job: UserJob
}
export interface UserJobsResponse {
  data: { data: UserJobCredential }
  meta: ApiMetaResponse
}

export interface NormalisedUserJobs {
  ids: string[]
  entities: Record<string, UserJobCredential>
}

export interface UserJobsState extends NormalisedUserJobs {
  formValues?: UserJobsFormValues | null
}

export interface UserJobsFormValues {
  type: UserCredentialTypes
  startTime: string
  endTime: string
  requestVerification: boolean
}
