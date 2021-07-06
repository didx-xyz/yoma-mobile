import { ApiMetaResponse, UserResponse } from 'modules/Auth/Auth.types'

export interface UpdateUserResponse {
  data: UserResponse
  meta: ApiMetaResponse
}
export type UpdateUserFailureResponse = string

export interface UserPayload {
  firstName?: string
  lastName?: string
  phoneNumber?: string
  countryAlpha2?: string
  biography?: string
}
