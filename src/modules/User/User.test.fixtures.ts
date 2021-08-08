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

export const CREDENTIALS_RESPONSE_MOCK = {
  data: [
    {
      challenge: {
        organisationId: '7f9df1bc-10b8-445c-0b4a-08d81d3203ed',
        organisationName: 'Test Org',
        organisationLogoURL: null,
        id: '210a91ff-38b9-42f2-9b50-b6655bbf0f7c',
        name: 'Test Graph',
        description: 'Test Graph',
        url: null,
        createdAt: '2021-02-01T00:00:00',
        zltoReward: 250,
        createdByAdmin: true,
        language: 'EN',
        startTime: '2021-02-01T00:00:00',
        endTime: null,
        published: true,
      },
      id: '88bbdc39-4146-4e1e-948f-5d33a2cfb3b5',
      verifiedAt: '2021-05-02T00:00:00',
      approved: true,
      approvalMessage: null,
      startDate: '2021-04-15T00:00:00',
      endDate: '2021-04-15T00:00:00',
      createdAt: '2021-05-21T00:00:00',
      fileId: null,
      fileURL: null,
      requestVerification: true,
    },
  ],
}
export const credentialsResponseFixture = createFixture(CREDENTIALS_RESPONSE_MOCK)
