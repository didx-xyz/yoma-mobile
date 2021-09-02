import { NormalisedData } from '../../redux/redux.types'
import { Challenge } from '../Challenges/Challenges.types'
import { UserCredentialMeta } from '../User/User.types'

export interface UserQualification extends UserCredentialMeta {
  challenge: Challenge
}

export type NormalisedUserQualifications = NormalisedData<UserQualification>

export interface UserQualificationItem
  extends Pick<Challenge, 'organisationLogoURL' | 'name'>,
    Pick<UserCredentialMeta, 'startDate'> {
  isValidated: boolean
}

export type NormalisedUserQualificationItem = NormalisedData<UserQualificationItem>

export interface UserQualificationsState extends NormalisedUserQualifications {}

export type ChallengeEntry = {
  challenge: string
  organisationLogoURL: string
  challengeHostProvider: string
  startDate: string
  endDate: string
  description: string
}

export type UserQualificationFormFields = {
  challenge: string
  challengeHostProvider: string
  description: string
  id: string
  startDate: Date | null
  endDate: Date | null
  skillNames: string[]
}
