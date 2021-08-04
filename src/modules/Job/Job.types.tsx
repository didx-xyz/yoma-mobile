import { ApiMetaResponse } from 'modules/Auth/Auth.types'
import { UserCredentialMeta } from 'modules/User/User.types'

export interface JobPayload {
  id: string
  title: string
  description: string
  createdAt: string
  createdByAdmin: boolean
  language: string
  published: boolean
  skills: string[]
}

export interface JobOrganisationPayload extends JobPayload {
  organisationId: string
  organisationName: string
  organisationLogoURL: string
  organisationURL: string
  organisationPrimaryContactName: string
  organisationPrimaryContactEmail: string
  organisationPrimaryContactPhone: string
}

export interface JobCredentialsTmpFormValues {
  credentialId?: string
  startTime: string
  endTime: string
}

export interface JobResponsePayload {
  data: { data: JobPayload }
  meta: ApiMetaResponse
}

export interface JobRequestPayload {
  id?: string
  title: string
  description: string
  language: string
  published: boolean
  skillNames: string[]
  organisationId: string
  startTime: string | null
  endTime: string | null
}
export interface JobCredentials extends UserCredentialMeta {
  job: JobOrganisationPayload
}
export interface JobState {
  tmpFormValues?: any
  jobEntities: any
}
