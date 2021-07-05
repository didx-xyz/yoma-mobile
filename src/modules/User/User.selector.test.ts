import * as SUT from './User.selector'

describe('modules/User/User.selector', () => {
  describe('selectBiography ', () => {
    it('should return expected prop value from user data', () => {
      // given ...
      const state = {
        user: {
          id: 'USER_ID',
          firstName: 'FIRST_NAME',
          lastName: 'LAST_NAME',
          phoneNumber: 'PHONE_NUMBER',
          biography: 'BIOGRAPHY',
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
      // when ... we call the selector
      const result = SUT.selectBiography(state)
      // then ... should return result as expected
      expect(result).toEqual('BIOGRAPHY')
    })
  })
  describe('selectUserUpdateCredentials', () => {
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
        payload: {
          biography: 'BIOGRAPHY',
        },
      }
      // when selectUserUpdateCredentials
      const result = SUT.selectUserUpdateCredentials(mockPayload)(mockState)

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
