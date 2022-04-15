export interface ApiMetaResponse {
  success: boolean
  code: number
  message: string | null
}

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

export interface OAuthLoginSuccessResponse extends AuthRefreshTokenResponse, OAuthCredentialsResponse {}

export type AuthLoginFailureResponse = string

export type AuthState = {
  token: string
  expiresAt: string
  idToken: string
  tokenType: string
  scopes: OAuthScopes
  tokenAdditionalParameters?: OAuthAdditionalParams
  authorizeAdditionalParameters?: OAuthAdditionalParams
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

export type SecureStorageRefreshToken = string | null
