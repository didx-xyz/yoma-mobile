import { mergeRight } from 'ramda'

import { ApiClients, ApiMeta, ApiMethods } from '../api.types'
import { UsersEndpoints } from './users.types'

export const USERS_CONFIG: Partial<ApiMeta> = {
  client: ApiClients.Users,
  method: ApiMethods.Get,
  isTokenRequired: true,
}

export const USERS_EDIT_CONFIG: Partial<ApiMeta> = mergeRight(USERS_CONFIG, {
  method: ApiMethods.Patch,
})
export const USERS_GET_BY_ID_CONFIG: Partial<ApiMeta> = mergeRight(USERS_CONFIG, {})
export const USERS_CREDENTIALS_GET_BY_ID_CONFIG: Partial<ApiMeta> = mergeRight(USERS_CONFIG, {
  endpoint: UsersEndpoints.Credentials,
})
export const USERS_CREDENTIALS_GET_BY_TYPE_CONFIG: Partial<ApiMeta> = mergeRight(USERS_CONFIG, {
  endpoint: UsersEndpoints.Credentials,
})
export const USERS_CREDENTIALS_CREATE_CONFIG: Partial<ApiMeta> = mergeRight(USERS_CONFIG, {
  method: ApiMethods.Post,
  endpoint: UsersEndpoints.Credentials,
})
export const USERS_CREDENTIALS_EDIT_CONFIG: Partial<ApiMeta> = mergeRight(USERS_CONFIG, {
  method: ApiMethods.Patch,
  endpoint: UsersEndpoints.Credentials,
})
export const USERS_PASSWORD_EDIT_CONFIG: Partial<ApiMeta> = mergeRight(USERS_CONFIG, {
  method: ApiMethods.Patch,
  endpoint: UsersEndpoints.Password,
})
export const USERS_PHOTO_CREATE_CONFIG: Partial<ApiMeta> = mergeRight(USERS_CONFIG, {
  method: ApiMethods.Post,
  endpoint: UsersEndpoints.Photo,
  additionalHeaders: { 'Content-Type': 'multipart/form-data' },
})
