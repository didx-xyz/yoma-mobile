import Env from '../../../env.json'

export const GOOGLE_SIGNIN_WEBCLIENT_ID = Env.GOOGLE_SIGNIN_WEBCLIENT_ID
export const FACEBOOK_PERMISSIONS = ['email', 'public_profile']
export const GOOGLE_AUTH_CONFIG = {
  webClientId: GOOGLE_SIGNIN_WEBCLIENT_ID,
  offlineAccess: true,
}
