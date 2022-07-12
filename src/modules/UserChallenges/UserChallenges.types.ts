import { DocumentPickerResponse } from 'react-native-document-picker'

import { types as ApiTypes } from '~/api'
import { types as ChallengesTypes } from '~/modules/Challenges'
import { types as CompletedChallengesFormTypes } from '~/modules/CompletedChallenges/Form'
import { types as UserTypes } from '~/modules/User'
import * as ReduxTypes from '~/redux/redux.types'
import * as Types from '~/types/general.types'

export interface UserChallenge extends UserTypes.UserCredentialMeta {
  challenge?: ChallengesTypes.Challenge
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
  meta: ApiTypes.ApiResponseMeta
}
export type NormalisedUserChallenges = ReduxTypes.NormalisedData<UserChallenge>

export type UserChallengeFormValues = { certificate: DocumentPickerResponse }
export interface UserChallengesState extends NormalisedUserChallenges {
  formValues?: UserChallengeFormValues
}
