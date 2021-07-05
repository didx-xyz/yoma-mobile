import { ApiMetaResponse, UserResponse } from 'modules/Auth/Auth.types'

export interface UpdateUserCredentialsResponse {
  data: UserResponse
  meta: ApiMetaResponse
}
export type UpdateUserCredentialsFailureResponse = string

export interface UserCredentialsPayload {
  firstName?: string
  lastName?: string
  phoneNumber?: string
  countryAlpha2?: string
  biography?: string
}
