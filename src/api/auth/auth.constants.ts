import { mergeRight } from 'ramda'
import { AuthConfiguration } from 'react-native-app-auth'

import Env from '~/env.json'

import { API_VERSION_PART } from '../api.constants'
import { ApiClients, ApiMeta, ApiMethods } from '../api.types'
import { AuthEndpoints } from './auth.types'

export const OAUTH_SETUP_CONFIG: AuthConfiguration = {
  warmAndPrefetchChrome: true,
  issuer: Env.OAUTH_BASE_PATH,
  scopes: ['openid', 'profile', 'yoma-api-v1', 'offline_access'],
  clientId: 'yoma-mobile-app',
  redirectUrl: 'com.yomamobile.auth://auth/sign-in',
}

export const OAUTH_CONFIG: Partial<ApiMeta> = {
  client: ApiClients.OAuth,
  method: ApiMethods.Get,
  isTokenRequired: true,
}

export const USER_INFO_CONFIG: Partial<ApiMeta> = mergeRight(OAUTH_CONFIG, {
  endpoint: AuthEndpoints.UserInfo,
})

export const AUTH_CONFIG: Partial<ApiMeta> = {
  client: ApiClients.Auth,
  method: ApiMethods.Post,
  isTokenRequired: false,
  urlSuffix: API_VERSION_PART,
}

export const SESSION_CONFIG: Partial<ApiMeta> = mergeRight(AUTH_CONFIG, {
  endpoint: AuthEndpoints.Session,
})
