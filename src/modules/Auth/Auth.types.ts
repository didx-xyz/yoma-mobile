import { AuthEndpoints } from '../../api/auth/auth.types'

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
}

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
  role: string | null
  organisation: string | null
  createdAt: string
  lastLogin: string
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
