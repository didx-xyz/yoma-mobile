import { NormalisedData } from '../../redux/redux.types'
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

export interface NormalisedUserChallenges {
  ids: string[]
  entities: Record<string, UserChallenge>
}

export interface UserChallengeItem
  extends Pick<Challenge, 'organisationLogoURL' | 'name'>,
    Pick<UserCredentialMeta, 'startDate'> {
  isValidated: boolean
}

export type NormalisedUserChallengeItem = NormalisedData<UserChallengeItem>

export interface UserChallengesState extends NormalisedUserChallenges {}

export type ChallengeEntry = {
  challenge: string
  organisationLogoUrl: string
  challengeHostProvider: string
  startDate: string
  endDate: string
  description: string
}

export type UserChallengeFormFields = {
  challenge: string
  challengeHostProvider: string
  description: string
  id: string
  startDate: Date | null
  endDate: Date | null
  skillNames: string[]
}
