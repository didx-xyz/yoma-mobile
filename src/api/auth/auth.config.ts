import { mergeRight } from 'ramda'

import { ApiClients, ApiMeta, ApiMethods } from '../api.types'
import { AuthEndpoints } from './auth.types'

export const DEFAULT_AUTH_CONFIG: Partial<ApiMeta> = {
  client: ApiClients.Auth,
  method: ApiMethods.Post,
  requiresToken: false,
}

export const DEFAULT_LOGIN_CONFIG: Partial<ApiMeta> = mergeRight(DEFAULT_AUTH_CONFIG, {
  endpoint: AuthEndpoints.Login,
})
export const DEFAULT_LOGIN_SOCIAL_CONFIG: Partial<ApiMeta> = mergeRight(DEFAULT_AUTH_CONFIG, {
  endpoint: AuthEndpoints.LoginSocial,
})
export const DEFAULT_REGISTER_CONFIG: Partial<ApiMeta> = mergeRight(DEFAULT_AUTH_CONFIG, {
  endpoint: AuthEndpoints.Register,
})
export const DEFAULT_REGISTER_SOCIAL_CONFIG: Partial<ApiMeta> = mergeRight(DEFAULT_AUTH_CONFIG, {
  endpoint: AuthEndpoints.RegisterSocial,
})
export const DEFAULT_RESET_PASSWORD_CONFIG: Partial<ApiMeta> = mergeRight(DEFAULT_AUTH_CONFIG, {
  endpoint: AuthEndpoints.ResetPassword,
})
