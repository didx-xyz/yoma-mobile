import { NormalisedData } from '../../redux/redux.types'
import { UserCredentialMeta } from '../User/User.types'

export interface QualificationOrganisationResponse {
  id: string
  title: string | null
  description: string | null
  instructions: string | null
  url: string | null
  createdAt: string
  zltoReward: number | null
  createdByAdmin: boolean
  language: string | null
  difficulty: string | null
  timeValue: number | null
  timePeriod: string | null
  startTime: string | null
  endTime: string | null
  published: boolean
  organisationId: string | null
  organisationName: string | null
  organisationLogoURL: string | null
  organisationURL: string | null
  organisationPrimaryContactName: string | null
  organisationPrimaryContactEmail: string | null
  organisationPrimaryContactPhone: string | null
}

export interface UserQualification extends UserCredentialMeta {
  qualification: QualificationOrganisationResponse
}

export type NormalisedUserQualifications = NormalisedData<UserQualification>

export type UserQualificationsState = NormalisedUserQualifications
