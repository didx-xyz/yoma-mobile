import { USER_RESPONSE } from './../Profile/Profile.constants'
import * as SUT from './User.utils'
import { prepareUserPatch } from './User.utils'

describe('modules/User/User.utils', () => {
  describe('selectUserFromLoginPayload', () => {
    it('should return user data from login payload', () => {
      // given ... the auth success response
      const credentials = {
        payload: {
          data: {
            data: {
              user: USER_RESPONSE,
            },
          },
        },
      }
      // when selectUserFromLoginPayload
      const result = SUT.selectUserFromLoginPayload(credentials)
      //then expect user response data
      expect(result).toEqual(USER_RESPONSE)
    })
  })
  describe('prepareUserPatch', () => {
    it('should return user data merged with update payload', () => {
      // given ...
      const mockState = {
        user: {
          id: 'USER_ID',
          firstName: 'FIRST_NAME',
          lastName: 'LAST_NAME',
          phoneNumber: 'PHONE_NUMBER',
          biography: '',
          countryAlpha2: 'COUNTRY_ALPHA2',
          email: 'USER_EMAIL@SOMEWHERE.TEST',
          zltoWalletId: 'ZLTO_WALLET_ID',
          zltoBalance: 1000,
          covidChallengeCertificateURL: 'COVID_CHALLENGE_CERTIFICATE_URL',
          tideChallengeCertificateURL: 'TIDE_CHALLENGE_CERTIFICATE_URL',
          photoURL: 'PHOTO_URL',
          role: 'ROLE',
          organisation: 'ORGANISATION',
          createdAt: 'CREATED_AT',
          lastLogin: 'LAST_LOGIN',
        },
      }
      const mockPayload = {
        biography: 'BIOGRAPHY',
      }
      // when prepareUserPatch
      const result = prepareUserPatch(mockPayload)(mockState)

      //then expect user request data
      expect(result).toEqual({
        biography: 'BIOGRAPHY',
        firstName: 'FIRST_NAME',
        lastName: 'LAST_NAME',
        phoneNumber: 'PHONE_NUMBER',
        countryAlpha2: 'COUNTRY_ALPHA2',
      })
    })
  })
})
