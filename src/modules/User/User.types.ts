import { DocumentPickerResponse } from 'react-native-document-picker'

import { types as ApiTypes } from '~/api'
import { UserCredentialTypes } from '~/api/users/users.types'

import { UserChallenge } from '../UserChallenges/UserChallenges.types'
import { UserJobCredential } from '../UserJobs/UserJobs.types'

export interface UserDetails {
  id: string
  firstName: string
  lastName: string
  phoneNumber: null | string
  biography: null | string
  countryAlpha2: string
  email: string
  zltoWalletId: null | string
  zltoBalance: number
  covidChallengeCertificateURL: null | string
  tideChallengeCertificateURL: null | string
  photoURL: null | string
  organisationId: null | string
  organisation: null | string
  organisationVerified: false | string
  createdAt: string
  lastLogin: null | string
  age: null | string
  gender: string
}
export interface UserDetailsResponse {
  data: {
    data: UserDetails
    meta: ApiTypes.ApiResponseMeta
    status: ApiTypes.ApiResponseStatus
  }
  headers: ApiTypes.ApiResponseHeaders
}

export interface UpdateUserResponse {
  data: UserResponse
  meta: ApiTypes.ApiResponseMeta
}
export type UpdateUserFailureResponse = string

export interface UserPayload {
  firstName?: string
  lastName?: string
  phoneNumber?: string
  countryAlpha2?: string
  biography?: string
}

export type UploadUserPhotoFlowDependencies = { imagePicker: any; createPayload: any }

export interface UserResponse {
  id: string
  name: string
  firstName: string
  lastName: string
  phoneNumber: string | null
  biography: string | null
  countryAlpha2: string
  email: string
  zltoWalletId: string | null
  zltoBalance: number
  covidChallengeCertificateURL: string | null
  tideChallengeCertificateURL: string | null
  photoURL: string | null
  role?: string | null
  organisation: string | null
  organisationId: string | null
  organisationVerified: boolean
  createdAt: string
  lastLogin: string
}

export interface UserCredentialMeta {
  id: string
  verifiedAt: string | null
  approved: boolean | null
  approvalMessage: string | null
  startDate: string
  endDate: string
  createdAt: string
  fileId: string | null
  fileURL: string | null
  requestVerification: boolean
}

export interface UserCredentialItemPayload {
  type: UserCredentialTypes
  credentialItemId: string
  startTime: string
  endTime: string
  requestVerification: boolean
}

export interface UserCredentialFormValues {
  type: UserCredentialTypes
  startTime: string
  endTime: string
  requestVerification: boolean
  certificate?: DocumentPickerResponse
}

export type UserCredentials = UserChallenge[] | UserJobCredential[]
