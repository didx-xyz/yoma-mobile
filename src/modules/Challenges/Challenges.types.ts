import { NormalisedData } from '~/redux/redux.types'

export interface Challenge {
  approvedCredentials?: number
  countries?: string[]
  createdAt: string
  createdByAdmin: boolean
  description: string
  endTime: string | null
  id: string
  language: string
  name: string
  organisationId: string
  organisationLogoURL: string | null
  organisationName: string
  published: boolean
  rejectedCredentials?: number
  skills?: string[]
  skillsLearned?: number
  startTime: string
  totalZLTORewarded?: number
  unverifiedCredentials?: number
  url: string | null
  zltoReward: number
}

export type NormalisedChallenges = NormalisedData<Challenge>

export type ChallengesState = NormalisedChallenges
