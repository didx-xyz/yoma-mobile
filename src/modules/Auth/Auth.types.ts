import { AuthClientApi } from '../../api/auth/auth.types'

export interface ApiMetaResponse {
  success: boolean
  code: number
  message: string | null
}

export interface AuthCredentialsResponse {
  refreshToken: string
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

export interface AuthLoginSuccessData extends AuthCredentialsResponse {
  user: UserResponse
}

export interface AuthLoginSuccessResponse {
  data: AuthLoginSuccessData
  meta: ApiMetaResponse
}

export type AuthLoginFailureResponse = string

export type AuthState = AuthCredentialsResponse

export type AuthLoginMiddleware = {
  client: AuthClientApi
}

export interface AuthCredentials {
  email: string
  password: string
}
