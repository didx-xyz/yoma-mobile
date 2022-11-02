import { DocumentPickerResponse } from 'react-native-document-picker'

import { types as ApiTypes } from '~/api'
import { UserCredentialOpportunityTypes, UserCredentialTypes } from '~/api/users/users.types'
import { UserChallenge } from '~/modules/UserChallenges/UserChallenges.types'

import { UserWorkExperienceCredential } from '../UserWorkExperience/UserWorkExperience.types'

export interface UserDetails {
  age?: null | string
  biography: null | string
  countryAlpha2: string
  covidChallengeCertificateURL: null | string
  createdAt: string | null
  email: string
  firstName: string
  gender?: string
  id: string
  lastLogin: null | string
  name: null | string
  lastName: string
  organisation: null | string
  organisationId: null | string
  organisationVerified: false | string
  phoneNumber: string | null
  photoURL: null | string
  tideChallengeCertificateURL: null | string
  zltoBalance: number
  zltoWalletId: null | string
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

export enum UserFields {
  Firstname = 'firstName',
  Lastname = 'lastName',
  Email = 'email',
  Country = 'countryAlpha2',
  PhoneNumber = 'phoneNumber',
  PhotoURL = 'photoURL',
  Biography = 'biography',
}

export interface UserPayload {
  [UserFields.Firstname]?: string
  [UserFields.Lastname]?: string
  [UserFields.PhoneNumber]?: string | null
  [UserFields.Country]?: string
  [UserFields.Biography]?: string
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

export interface OpportunityCredentialPartial {
  type: UserCredentialOpportunityTypes
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

export type UserCredentials = UserChallenge[] | UserWorkExperienceCredential[]
