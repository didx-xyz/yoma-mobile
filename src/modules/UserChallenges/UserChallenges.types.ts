import * as ReduxTypes from '../../redux/redux.types'
import * as Types from '../../types/general.types'
import { types as AuthTypes } from '../Auth'
import { types as ChallengesTypes } from '../Challenges'
import { types as CompletedChallengesFormTypes } from '../CompletedChallenges/Form'
import { types as UserTypes } from '../User'

export interface UserChallenge extends UserTypes.UserCredentialMeta {
  challenge: ChallengesTypes.Challenge
}

export interface UserChallengeResponse {
  data: UserChallenge
}

export type CreateUserChallengePayload = Types.Modify<
  CompletedChallengesFormTypes.FormFields,
  {
    startTime: string
    endTime: string
  }
>

export interface CreateUserChallengeSuccessResponse {
  data: UserChallengeResponse
  meta: AuthTypes.ApiMetaResponse
}
export type NormalisedUserChallenges = ReduxTypes.NormalisedData<UserChallenge>

export interface UserChallengeItem
  extends Pick<ChallengesTypes.Challenge, 'organisationLogoURL' | 'name'>,
    Pick<UserTypes.UserCredentialMeta, 'startDate'> {
  isValidated: boolean
}

export type NormalisedUserChallengeItem = ReduxTypes.NormalisedData<UserChallengeItem>

export interface UserChallengesState extends NormalisedUserChallenges {}

export type ChallengeEntry = {
  challenge: string
  organisationLogoURL: string
  challengeHostProvider: string
  startDate: string
  endDate: string
  description: string
}
