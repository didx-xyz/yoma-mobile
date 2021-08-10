import { UserCredentialMeta } from '../User/User.types'

export interface Challenge {
  organisationId: string
  organisationName: string
  organisationLogoURL: string | null
  id: string
  name: string
  description: string
  url: string | null
  createdAt: string
  zltoReward: number
  createdByAdmin: boolean
  language: string
  startTime: string
  endTime: string | null
  published: boolean
}

export interface UserChallenge extends UserCredentialMeta {
  challenge: Challenge
}

export type NormalisedUserChallenges = {
  ids: string[]
  entities: Record<string, UserChallenge>
}

export type UserChallengesState = NormalisedUserChallenges
