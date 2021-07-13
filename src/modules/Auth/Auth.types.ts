import { AuthEndpoints } from '../../api/auth/auth.types'
import { UserResponse } from '../User/User.types'

export interface ApiMetaResponse {
  success: boolean
  code: number
  message: string | null
}

export interface AuthRefreshTokenResponse {
  refreshToken: string
}

export interface AuthCredentialsResponse {
  token: string
  expiresAt: string
  email?: string
  password?: string
}

export interface AuthLoginSuccessData extends AuthCredentialsResponse, AuthRefreshTokenResponse {
  user: UserResponse
}

export interface AuthLoginSuccessResponse {
  data: { data: AuthLoginSuccessData }
  meta: ApiMetaResponse
}

export type AuthLoginFailureResponse = string

export type AuthState = AuthCredentialsResponse

export type AuthLoginMiddleware = {
  client: AuthEndpoints
}

export interface AuthCredentials {
  email: string
  password: string
}

export interface AuthRegistration {
  firstName: string
  lastName: string
  email: string
  countryAlpha2: string
  password: string
  confirmPassword: string
  privacyInd: boolean
}

export type AuthRegistrationSuccessResponse = {
  meta: ApiMetaResponse
}

export type AuthRegistrationFailureResponse = string

export type SecureStorageRefreshToken = string | null
