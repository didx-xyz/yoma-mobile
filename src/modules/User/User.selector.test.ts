import { rootStateFixture } from 'redux/redux.test.fixtures'

import { USER_RESPONSE } from './../Profile/Profile.constants'
import { INITIAL_STATE } from './User.reducer'
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
  describe('selectUser ', () => {
    it('should return user property of the root state', () => {
      const state = {
        user: USER_RESPONSE,
      }
      // when ... we call the selector
      const result = SUT.selectUser(state)
      // then ... should return result as expected
      expect(result).toEqual(state.user)
    })
    it('should return the default user state', () => {
      const state = { user: INITIAL_STATE }
      // when ... we call the selector
      const result = SUT.selectUser(state)
      // then ... should return result as expected
      expect(result).toEqual(state.user)
    })
  })
  describe('selectUserId ', () => {
    it('should return user id property from user state', () => {
      // given ...
      const state = rootStateFixture({})
      // when ... we call the selector
      const result = SUT.selectUserId(state)
      // then ... should return user id as expected
      expect(result).toEqual('USER_ID')
    })
    it('should return the default user state', () => {
      const state = { user: INITIAL_STATE }
      // when ... we call the selector
      const result = SUT.selectUser(state)
      // then ... should return result as expected
      expect(result).toEqual(state.user)
    })
  })
})
