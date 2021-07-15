import { createFixture } from '../../../tests/tests.utils'
import { INITIAL_STATE } from './User.reducer'
import { UserResponse } from './User.types'

export const USER_RESPONSE: UserResponse = {
  id: 'xxxxxxxx-xxx-xxx-xxx-xxxxxxxxxxxx',
  firstName: 'Joe',
  lastName: 'Soap',
  phoneNumber: '12324567890',
  biography: 'something about me',
  countryAlpha2: 'ZA',
  email: 'user_test_email@gmail.com',
  zltoWalletId: 'zzzzzzzz-zzz-zzz-zzz-zzzzzzzzzzzz',
  zltoBalance: 250,
  covidChallengeCertificateURL: 'https://google.com',
  tideChallengeCertificateURL: 'https://google.com',
  photoURL: 'https://google.com',
  organisationId: 'xxx-xxx-xxx',
  organisation: 'Some Test Org',
  organisationVerified: false,
  createdAt: '2021-04-25T19:05:54.5496363',
  lastLogin: '2021-07-08T20:47:48.5560658Z',
}

export const userStateFixture = createFixture(USER_RESPONSE)
export const userInitialStateFixture = createFixture(INITIAL_STATE)
