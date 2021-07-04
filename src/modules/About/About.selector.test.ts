import * as SUT from './About.selector'

describe('modules/About/About.selector', () => {
  describe('selector ', () => {
    it('should select props as expected when available in state', () => {
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
      const result = SUT.default(state)
      // then ... should return result as expected
      expect(result).toEqual({ biography: 'BIOGRAPHY' })
    })
    it('should handle empty state if props not available', () => {
      // given ...
      const state = {}
      // when ... we call the selector
      const result = SUT.default(state)
      // then ... should return result as expected
      expect(result).toEqual({ biography: '' })
    })
  })
})
