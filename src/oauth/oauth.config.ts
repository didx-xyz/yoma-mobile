import { AuthConfiguration } from 'react-native-app-auth'

import Env from '../env.json'

const config: AuthConfiguration = {
  warmAndPrefetchChrome: true,
  issuer: Env.OAUTH_BASE_PATH,
  scopes: ['openid', 'profile', 'yoma-api-v1', 'offline_access'],
  clientId: 'yoma-mobile-app',
  // redirectUrl: 'https://staging.app.yoma.africa/auth/sign-in',
  redirectUrl: 'com.yomamobile.auth://auth/sign-in',
}
export default config
// com.yomamobile.auth://auth/sign-in <- redirect url on api
//redirectUrl: 'https://staging.app.yoma.africa/auth/sign-in',
