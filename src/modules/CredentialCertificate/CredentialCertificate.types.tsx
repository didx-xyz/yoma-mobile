import { UserCredentialTypes } from 'api/users/users.types'
import { ApiMetaResponse } from 'modules/Auth/Auth.types'
import { UserCredentials } from 'modules/User/User.types'

export interface CredentialCertificate {
  type: UserCredentialTypes | null
  credentialItemId: string | null
  startTime: string
  endTime: string
  requestVerification: boolean
}

export interface CredentialCertificateResponse {
  data: { data: UserCredentials }
  meta: ApiMetaResponse
}

export type CredentialCertificateRequest = CredentialCertificate
export type CredentialCertificateState = CredentialCertificate
