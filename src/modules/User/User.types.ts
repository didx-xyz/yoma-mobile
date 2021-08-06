import { ApiMetaResponse } from 'modules/Auth/Auth.types'

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

export interface UserCredentialPayload {
  startTime: string
  endTime: string
  requestVerification?: boolean
}
export interface UserCredentialRequestPayload extends UserCredentialPayload {
  type: string
  credentialItemId: string
}

export interface UserCredentialMeta {
  id: string
  verifiedAt: string
  approved: boolean
  approvalMessage: string
  startDate: string
  endDate: string
  createdAt: string
  fileId: string
  fileURL: string
  requestVerification: boolean
}
