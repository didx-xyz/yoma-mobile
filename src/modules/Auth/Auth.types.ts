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

export type OAuthAdditionalParams = { [name: string]: string } | undefined
export type OAuthScopes = string[]

export interface OAuthCredentialsResponse {
  accessToken: string
  accessTokenExpirationDate: string
  idToken: string
  tokenType: string
  scopes: OAuthScopes
  tokenAdditionalParameters?: OAuthAdditionalParams
}

export interface OAuthLoginSuccessResponse extends AuthRefreshTokenResponse, OAuthCredentialsResponse {}

export type AuthLoginFailureResponse = string

export type AuthState = AuthCredentialsResponse

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

export interface AuthSocialRegistrationCredentials {
  firstName: string
  lastName: string
  email: string
  provider: string
  providerKey: string
  token: string
}
export interface AuthSocialLoginCredentials {
  provider: string
  providerKey: string
  token: string
}

export type AuthRegistrationSuccessResponse = {
  meta: ApiMetaResponse
}

export interface ErrorResponseMeta {
  message: string
  code: string
  success: boolean
}

export interface ErrorResponseHeaders {
  'content-type': string
  date: string
  server: string
}

export interface ErrorResponse {
  data: {
    meta: ErrorResponseMeta
  }
  status: string
  statusText?: string
  headers: ErrorResponseHeaders
}

export type AuthRegistrationFailureResponse = ErrorResponse

export type SecureStorageRefreshToken = string | null
