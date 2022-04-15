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

export const defaultUserRegistrationResponseData = {
  meta: {
    success: true,
    code: 201,
    message: 'Account created.',
  },
}

export const userRegistrationData = {
  firstName: 'FIRST NAME',
  lastName: 'LAST NAME',
  email: 'USER EMAIL',
  countryAlpha2: 'COUNTRY CODE',
  password: 'USER PASSWORD',
  confirmPassword: 'USER PASSWORD',
  privacyInd: true,
}
