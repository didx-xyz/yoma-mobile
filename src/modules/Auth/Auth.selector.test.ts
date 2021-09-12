import { rootStateFixture } from '../../redux/redux.fixture'
import * as SUT from './Auth.selector'

describe('modules/Auth/Auth.selector', () => {
  describe('selectAuth', () => {
    it('should return auth property of the root state', () => {
      const stateMock = rootStateFixture({
        auth: {
          refreshToken: 'REFRESH_TOKEN',
          token: 'USER_TOKEN',
          expiresAt: 'EXPIRY_DATE',
        },
      })
      // when ... we call the selector
      const result = SUT.selectAuth(stateMock)
      // then ... should return result as expected
      expect(result).toEqual(stateMock.auth)
    })
    it('should return the default auth state', () => {
      const stateMock = rootStateFixture()
      // when ... we call the selector
      const result = SUT.selectAuth(stateMock)
      // then ... should return result as expected
      expect(result).toEqual(stateMock.auth)
    })
  })
  describe('selectToken', () => {
    it('should return a valid user token', () => {
      const stateMock = rootStateFixture({
        auth: {
          refreshToken: 'REFRESH_TOKEN',
          token: 'USER_TOKEN',
          expiresAt: 'EXPIRY_DATE',
        },
      })
      // when ... we call the selector
      const result = SUT.selectToken(stateMock)
      // then ... should return result as expected
      expect(result).toBe('USER_TOKEN')
    })
    it('should return null if the token does not exist', () => {
      const stateMock = rootStateFixture()
      // when ... we call the selector
      const result = SUT.selectToken(stateMock)
      // then ... should return result as expected
      expect(result).toBeNull()
    })
  })
  describe('selectIsAuthenticated', () => {
    it('Should correctly handle a default state', () => {
      const stateMock = rootStateFixture()
      // when ... we call the selector
      const result = SUT.selectIsAuthenticated(stateMock)
      // then ... should return result as expected
      expect(result).toEqual(false)
    })
    it('should check if the user is authenticated.', () => {
      const stateMock = rootStateFixture({
        auth: {
          refreshToken: 'REFRESH_TOKEN',
          token: 'USER_TOKEN',
          expiresAt: 'EXPIRY_DATE',
        },
      })
      // when ... we call the selector
      const result = SUT.selectIsAuthenticated(stateMock)
      // then ... should return result as expected
      expect(result).toEqual(true)
    })
  })
  describe('selectLoginCredentials', () => {
    it('should return user login credentials.', () => {
      const state = rootStateFixture({
        auth: { email: 'EMAIL', password: 'PASSWORD' },
      })
      // when ... we call the selector
      const result = SUT.selectLoginCredentials(state)
      // then ... should return result as expected
      expect(result).toEqual({ email: 'EMAIL', password: 'PASSWORD' })
    })
  })
})
