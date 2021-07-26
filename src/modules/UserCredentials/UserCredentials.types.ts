import { Skills } from '../Skills/Skills.types'

export type UserCredentialRequestPayload = {
  type: string
  credentialItemId: string
  startTime: string
  endTime: string
  requestVerification: boolean
}

export interface QualificationCredentialPayload {
  createdAt: string
  createdByAdmin: true
  description: string
  endTime: string
  id: string
  language: string
  organisationId: string
  organisationLogoURL: string
  organisationName: string
  organisationPrimaryContactEmail: string
  organisationPrimaryContactName: string
  organisationPrimaryContactPhone: string
  organisationURL: string
  published: boolean
  startTime: string
  title: string
  url: string
  zltoReward: number
}

export interface QualificationCredentialMeta extends QualificationCredentialPayload {
  approvedCredentials: number
  countries: string[]
  rejectedCredentials: number
  skills: Skills
  skillsLearned: number
  totalZLTORewarded: number
  unverifiedCredentials: number
}

export interface UserCredentialCertificate {
  id: string
  verifiedAt: string
  approved: boolean
  startDate: string
  endDate: string
  createdAt: string
  fileURL: string
  fileId: string
  requestVerification: boolean
}
