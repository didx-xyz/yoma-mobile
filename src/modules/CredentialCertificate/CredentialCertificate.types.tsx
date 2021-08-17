import { UserCredentialTypes } from 'api/users/users.types'
import { ApiMetaResponse } from 'modules/Auth/Auth.types'
import { UserCredentials } from 'modules/User/User.types'

export interface CredentialCertificate {
  startTime: string
  endTime: string
  requestVerification: boolean
}

export interface CredentialCertificateRequest extends CredentialCertificate {
  type: UserCredentialTypes | null
  credentialItemId: string | null
}

export interface CredentialCertificateResponse extends CredentialCertificate {
  id: string
  verifiedAt: string
  approved: boolean
  approvalMessage: string
  createdAt: string
  fileId: string
  fileURL: string
}

export interface CredentialCertificateResponse {
  data: { data: UserCredentials }
  meta: ApiMetaResponse
}

export type CredentialCertificateState = CredentialCertificate
