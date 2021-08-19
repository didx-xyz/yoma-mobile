import { NormalisedData } from '../../redux/redux.types'
import { Challenge } from '../Challenges/Challenges.types'
import { UserCredentialMeta } from '../User/User.types'

export interface UserChallenge extends UserCredentialMeta {
  challenge: Challenge
}

export type NormalisedUserChallenges = NormalisedData<UserChallenge>

export interface UserChallengeItem {
  startDate: string
  isValidated: boolean
  name: string
  avatarUrl: string | null
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
