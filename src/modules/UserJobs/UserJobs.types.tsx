import { ApiMetaResponse } from 'modules/Auth/Auth.types'
import { UserCredentialMeta } from 'modules/User/User.types'

export interface UserJob {
  id: string
  title: string
  description: string
  createdAt: string
  createdByAdmin: boolean
  language: string
  published: boolean
  skills: string[]
}

export interface UserJobsOrganisation extends UserJob {
  organisationId: string
  organisationName: string
  organisationLogoURL: string
  organisationURL: string
  organisationPrimaryContactName: string
  organisationPrimaryContactEmail: string
  organisationPrimaryContactPhone: string
}

export interface UserJobsCredentialsTmpFormValues {
  credentialId?: string
  requestVerification?: boolean
  startTime: string
  endTime: string
}

export interface UserJobsResponsePayload {
  data: { data: UserJob }
  meta: ApiMetaResponse
}

export interface UserJobsRequestPayload {
  title: string
  description: string
  language: string
  published: boolean
  skillNames: string[]
  organisationId: string
  startTime: string | null
  endTime: string | null
}

export interface UserJobsUpdatePayload extends UserJobsRequestPayload {
  id: string
  credentialsId: string
}

export interface UserJobsCredentials extends UserCredentialMeta {
  job: UserJobsOrganisation
}
export interface UserJobsState {
  tmpFormValues?: any
  jobEntities: any
}
