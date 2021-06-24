import { INITIAL_STATE } from './Auth.reducer'
import * as SUT from './Auth.selector'

describe('modules/Auth/Auth.selector', () => {
  describe('selectAuthState', () => {
    it('should return auth property of the root state', () => {
      const state = {
        auth: {
          refreshToken: 'REFRESH_TOKEN',
          token: 'USER_TOKEN',
          expiresAt: 'EXPIRY_DATE',
        },
      }
      // when ... we call the selector
      const result = SUT.selectAuthState(state)
      // then ... should return result as expected
      expect(result).toEqual(state.auth)
    })
    it('should return the default auth state', () => {
      const state = { auth: INITIAL_STATE }
      // when ... we call the selector
      const result = SUT.selectAuthState(state)
      // then ... should return result as expected
      expect(result).toEqual(state.auth)
    })
  })
  describe('selectToken', () => {
    it('should return a valid user token', () => {
      const state = {
        auth: {
          refreshToken: 'REFRESH_TOKEN',
          token: 'USER_TOKEN',
          expiresAt: 'EXPIRY_DATE',
        },
      }
      // when ... we call the selector
      const result = SUT.selectToken(state)
      // then ... should return result as expected
      expect(result).toBe('USER_TOKEN')
    })
    it('should return null if the token does not exist', () => {
      const state = {
        auth: INITIAL_STATE,
      }
      // when ... we call the selector
      const result = SUT.selectToken(state)
      // then ... should return result as expected
      expect(result).toBeNull()
    })
  })
  describe('selectIsAuthenticated', () => {
    it('Should correctly handle a default state', () => {
      const state = {
        auth: INITIAL_STATE,
      }
      // when ... we call the selector
      const result = SUT.selectIsAuthenticated(state)
      // then ... should return result as expected
      expect(result).toEqual(false)
    })
    it('should check if the user is authenticated.', () => {
      const state = {
        auth: {
          refreshToken: 'REFRESH_TOKEN',
          token: 'USER_TOKEN',
          expiresAt: 'EXPIRY_DATE',
        },
      }
      // when ... we call the selector
      const result = SUT.selectIsAuthenticated(state)
      // then ... should return result as expected
      expect(result).toEqual(true)
    })
  })
})
