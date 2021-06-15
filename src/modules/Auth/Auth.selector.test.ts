import { INITIAL_STATE } from './Auth.reducer'
import * as SUT from './Auth.selector'

describe('modules/Auth/Auth.selector', () => {
  describe('selectIsAuthorised', () => {
    it('it should check if the auth is not available.', () => {
      const state = {
        auth: INITIAL_STATE,
      }
      // when ... we call the selector
      const result = SUT.selectIsAuthenticated(state)
      // then ... should return result as expected
      expect(result).toEqual(false)
    })
    it('it should check if the user is authenticated.', () => {
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

    it('it should return a valid user token', () => {
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
      expect(typeof result).toBe('string')
    })

    it('it should check incorrect auth properties.', () => {
      // mock incorrect properties from the server
      const state = {
        auth: {
          refreshToken: 'REFRESH_TOKEN',
          userToken: 'USER_TOKEN',
          expires: 'EXPIRY_DATE',
        },
      }
      // when ... we call the selector
      const result = SUT.selectIsAuthenticated(state)
      // then ... should return result as expected
      expect(result).toEqual(false)
    })
  })
})
