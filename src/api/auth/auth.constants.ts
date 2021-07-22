import { mergeRight } from 'ramda'

import { ApiClients, ApiMeta, ApiMethods } from '../api.types'
import { AuthEndpoints } from './auth.types'

export const AUTH_CONFIG: Partial<ApiMeta> = {
  client: ApiClients.Auth,
  method: ApiMethods.Post,
  isTokenRequired: false,
}

export const LOGIN_CONFIG: Partial<ApiMeta> = mergeRight(AUTH_CONFIG, {
  endpoint: AuthEndpoints.Login,
})
export const SESSION_CONFIG: Partial<ApiMeta> = mergeRight(AUTH_CONFIG, {
  endpoint: AuthEndpoints.Session,
})
export const LOGIN_SOCIAL_CONFIG: Partial<ApiMeta> = mergeRight(AUTH_CONFIG, {
  endpoint: AuthEndpoints.LoginSocial,
})
export const REGISTER_CONFIG: Partial<ApiMeta> = mergeRight(AUTH_CONFIG, {
  endpoint: AuthEndpoints.Register,
})
export const REGISTER_SOCIAL_CONFIG: Partial<ApiMeta> = mergeRight(AUTH_CONFIG, {
  endpoint: AuthEndpoints.RegisterSocial,
})
export const RESET_PASSWORD_CONFIG: Partial<ApiMeta> = mergeRight(AUTH_CONFIG, {
  endpoint: AuthEndpoints.ResetPassword,
})
