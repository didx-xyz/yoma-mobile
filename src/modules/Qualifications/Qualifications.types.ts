import { NormalisedData } from '~/redux/redux.types'

export interface Qualification {
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
  skills: string[] | null
  countries: string[] | null
  unverifiedCredentials: number | null
  approvedCredentials: number | null
  rejectedCredentials: number | null
  totalZLTORewarded: number | null
  skillsLearned: number | null
}

export type NormalisedQualifications = NormalisedData<Qualification>

export type QualificationsState = NormalisedQualifications
