import { ApiMetaResponse, AuthLoginSuccessData } from 'modules/Auth/Auth.types'

export interface UpdateUserCredentialsResponse {
  data: { data: AuthLoginSuccessData }
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
