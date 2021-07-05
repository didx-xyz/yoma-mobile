import * as SUT from './Profile.selector'

describe('modules/Profile/Profile.selector', () => {
  describe('selector ', () => {
    it('should select props as expected when available in state', () => {
      //given ...user data
      const state = {
        user: {
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
        },
      }
      // when ... we call the selector
      const result = SUT.default(state)
      // then ... should return result as expected
      expect(result).toEqual({
        user: {
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
        },
      })
    })
  })
})
