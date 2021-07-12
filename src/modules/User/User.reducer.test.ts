import { rootStateFixture } from 'redux/redux.test.fixtures'

import { USER_RESPONSE } from './../Profile/Profile.constants'
import SUT, { clearUser, INITIAL_STATE, setUser } from './User.reducer'

describe('modules/User/User.reducer', () => {
  describe('setUser', () => {
    it('should return user data from login payload', () => {
      // given ... there are are credentials in user state
      const state = {}
      const mockReponseData = {
        ...USER_RESPONSE,
      }
      // when ... we set the response credentials
      const action = setUser(mockReponseData)
      const result = SUT(state, action)
      // then ... user state should equal the credentials
      expect(result).toEqual(mockReponseData)
    })
    describe('clearUser', () => {
      it('should clear user state', () => {
        // given ... user data in state
        const state = rootStateFixture({
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
        })
        // when we clearUser
        const action = clearUser()
        const result = SUT(state, action)
        // then ... should set the default User state
        expect(result).toEqual(INITIAL_STATE)
      })
    })
  })
})
