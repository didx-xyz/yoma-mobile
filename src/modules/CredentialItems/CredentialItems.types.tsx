import { UserCredentialTypes } from 'api/users/users.types'
import { ApiMetaResponse } from 'modules/Auth/Auth.types'
import { UserCredentials } from 'modules/User/User.types'

export interface CredentialItem {
  type: UserCredentialTypes | null
  credentialItemId: string | null
  startTime: string
  endTime: string
  requestVerification: boolean
}

export interface CredentialItemsResponse {
  data: { data: UserCredentials }
  meta: ApiMetaResponse
}

export type CredentialItemsRequest = CredentialItem
export type CredentialItemsState = CredentialItem
