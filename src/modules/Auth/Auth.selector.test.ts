import * as SUT from './Auth.selector'

describe('modules/Auth/Auth.selector', () => {
  describe('selectIsAuthorised', () => {
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

    it('it should check if the user is not authenticated.', () => {
      const state = {
        auth: {
          refreshToken: '',
          token: '',
          expiresAt: '',
        },
      }
      // when ... we call the selector
      const result = SUT.selectIsAuthenticated(state)
      // then ... should return result as expected
      expect(result).toEqual(false)
    })

    it('it should check if the auth is not available.', () => {
      const state = {}
      // when ... we call the selector
      const result = SUT.selectIsAuthenticated(state)
      // then ... should return result as expected
      expect(result).toEqual(false)
    })
  })
})
