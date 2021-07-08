import { rootStateFixture } from '../../redux/redux.test.fixtures'
import { USER_RESPONSE } from '../Profile/Profile.constants'
import { INITIAL_STATE } from './User.reducer'
import * as SUT from './User.selector'

describe('modules/User/User.selector', () => {
  describe('selectUser ', () => {
    it('should return user property of the root state', () => {
      const stateMock = rootStateFixture({
        user: USER_RESPONSE,
      })
      // when ... we call the selector
      const result = SUT.selectUser(stateMock)
      // then ... should return result as expected
      expect(result).toEqual(stateMock.user)
    })
    it('should return the default user state', () => {
      const stateMock = rootStateFixture({ user: INITIAL_STATE })
      // when ... we call the selector
      const result = SUT.selectUser(stateMock)
      // then ... should return result as expected
      expect(result).toEqual(stateMock.user)
    })
  })
  describe('selectBiography ', () => {
    it('should return expected prop value from user data', () => {
      // given ...
      const stateMock = rootStateFixture({
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
      // when ... we call the selector
      const result = SUT.selectBiography(stateMock)
      // then ... should return result as expected
      expect(result).toEqual('BIOGRAPHY')
    })
  })
  describe('selectUserId ', () => {
    it('should return the default value for the id if none exists', () => {
      // given ... no user data available
      const stateMock = rootStateFixture()
      // when ... we get the user's id
      const result = SUT.selectUserId(stateMock)
      // then ... should return an empty string
      expect(result).toBe('')
    })
    it('should return user property of the root state', () => {
      // given ... a valid user
      const stateMock = rootStateFixture({
        user: { ...USER_RESPONSE, id: 'A USER ID' },
      })
      // when ... we get the user's id
      const result = SUT.selectUserId(stateMock)
      // then ... we should the user's id returned
      expect(result).toBe('A USER ID')
    })
  })
})
