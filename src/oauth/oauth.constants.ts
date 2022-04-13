import { AuthConfiguration } from 'react-native-app-auth'

import Env from '../env.json'

export const config: AuthConfiguration = {
  warmAndPrefetchChrome: true,
  issuer: Env.OAUTH_BASE_PATH,
  scopes: ['openid', 'profile', 'yoma-api-v1', 'offline_access'],
  clientId: 'yoma-mobile-app',
  redirectUrl: 'com.yomamobile.auth://auth/sign-in',
}
