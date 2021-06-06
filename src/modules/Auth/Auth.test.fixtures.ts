import { mergeDeepRight } from 'ramda'

import { AuthLoginSuccessResponse, UserResponse } from './Auth.types'

export const defaultUserData: UserResponse = {
  id: 'USER_ID',
  firstName: 'FirstName',
  lastName: 'LastName',
  phoneNumber: '+2712345679',
  biography: null,
  countryAlpha2: 'ZA',
  email: 'USER_EMAIL@SOMEWHERE.TEST',
  zltoWalletId: null,
  zltoBalance: 0,
  covidChallengeCertificateURL: null,
  tideChallengeCertificateURL: null,
  photoURL: null,
  role: null,
  organisation: null,
  createdAt: '2021-04-25T19:05:54.5496363',
  lastLogin: '2021-04-25T19:27:39.5278619Z',
}

export const defaultUserLoginResponseData: AuthLoginSuccessResponse = {
  data: {
    refreshToken: 'REFRESH_TOKEN',
    token: 'USER_TOKEN',
    expiresAt: 'EXPIRY_DATE',
    user: defaultUserData,
  },
  meta: {
    success: true,
    code: 200,
    message: null,
  },
}

export const createSuccessfulLoginResponseFixture = (data: Partial<AuthLoginSuccessResponse> = {}) =>
  mergeDeepRight(defaultUserLoginResponseData)(data)

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
