import { OAuthLoginSuccessResponse } from './Auth.types'

export const defaultUserLoginResponseData: OAuthLoginSuccessResponse = {
  accessToken: 'TOKEN',
  accessTokenExpirationDate: 'EXPIRES_AT',
  idToken: 'ID_TOKEN',
  tokenType: 'TOKEN_TYPE',
  refreshToken: 'REFRESH_TOKEN',
  scopes: ['SCOPES'],
  tokenAdditionalParameters: { aKey: 'TOKEN_ADDITIONAL_PARAMETERS' },
  authorizeAdditionalParameters: { aKey: 'AUTHORIZE_ADDITIONAL_PARAMETERS' },
}
