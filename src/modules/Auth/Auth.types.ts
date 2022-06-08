import { ApiResponseHeaders } from '~/api/api.types'

export interface AuthRefreshTokenResponse {
  refreshToken: string
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
  authorizeAdditionalParameters?: OAuthAdditionalParams
}

export type OAuthLoginSuccessResponse = AuthRefreshTokenResponse & OAuthCredentialsResponse

export type OAuthLoginFailureResponse = string

export interface OAuthUserResponseData {
  name: string
  family_name: string
  given_name: string
  sub: string
}

export interface OAuthUserResponseHeaders extends ApiResponseHeaders {
  'cache-control': string
  pragma: string
}

export interface OAuthUserResponse {
  data: OAuthUserResponseData
  status: number
  headers: OAuthUserResponseHeaders
}

export type AuthState = {
  token: string
  expiresAt: string
  idToken: string
  tokenType: string
  scopes: OAuthScopes
  tokenAdditionalParameters?: OAuthAdditionalParams
  authorizeAdditionalParameters?: OAuthAdditionalParams
}

export type SecureStorageRefreshToken = string | null
