import { rootStateFixture } from '~/redux/redux.fixture'

import { USER_RESPONSE, userInitialStateFixture } from './User.fixture'
import SUT, { INITIAL_STATE, clearUser, setUser } from './User.reducer'

describe('modules/User/User.reducer', () => {
  describe('setUser', () => {
    it('should update the user state', () => {
      // given ... no user data
      const stateMock = userInitialStateFixture()

      // when ... we set the response credentials
      const responseDataMock = USER_RESPONSE

      const action = setUser(responseDataMock)
      const result = SUT(stateMock, action)

      // then ... user state should be updated with the new data
      expect(result).toEqual(responseDataMock)
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
