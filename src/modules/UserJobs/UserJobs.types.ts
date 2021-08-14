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

export interface NormalisedUserJobs {
  ids: string[]
  entities: Record<string, UserJobCredential>
}

export interface UserJobsState extends NormalisedUserJobs {}
