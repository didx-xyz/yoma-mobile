import { ApiMetaResponse } from 'modules/Auth/Auth.types'
import { Skills } from 'modules/Skills/Skills.types'
import { UserCredentialMeta } from 'modules/User/User.types'

export interface JobPayload {
  id: string
  title: string
  description: string
  createdAt: string
  createdByAdmin: boolean
  language: string
  published: boolean
  skills: Skills
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
  startTime: string
  endTime: string
}

export interface JobResponsePayload {
  data: JobPayload
  meta: ApiMetaResponse
}

export interface JobRequestPayload {
  title: string
  description: string
  language: string
  published: boolean
  skillNames: Skills
  organisationId: string
  startTime: string | null
  endTime: string | null
}
export interface JobCredentials extends UserCredentialMeta {
  job: JobOrganisationPayload
}
export interface JobState {
  tmpFormValues?: any
  jobEntities: JobCredentials[]
}
