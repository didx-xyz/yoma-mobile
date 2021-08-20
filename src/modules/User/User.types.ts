import { UserCredentialTypes } from 'api/users/users.types'
import { ApiMetaResponse } from 'modules/Auth/Auth.types'

import { UserChallenge } from '../UserChallenges/UserChallenges.types'
import { UserJobCredential } from './../UserJobs/UserJobs.types'

export interface UpdateUserResponse {
  data: UserResponse
  meta: ApiMetaResponse
}
export type UpdateUserPhotoPayload = any
export type UpdateUserFailureResponse = string

export interface UserPayload {
  firstName?: string
  lastName?: string
  phoneNumber?: string
  countryAlpha2?: string
  biography?: string
}
export interface PhotoUploadFormConfig {
  formName: string
  formInstance: any
}

export interface PhotoUploadFormData {
  uri: string
  name: string | 'default.jpg'
  type: string
}

export type UploadUserPhotoFlowDependencies = { imagePicker: any; createPayload: any }

export interface UserResponse {
  id: string
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
  approved: boolean
  approvalMessage: string | null
  startDate: string
  endDate: string | null
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
}

export type UserCredentials = UserChallenge | UserJobCredential[]
