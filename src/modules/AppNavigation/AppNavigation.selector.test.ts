import { INITIAL_STATE } from 'modules/Auth/Auth.reducer'

import * as SUT from './AppNavigation.selector'

describe('modules/AppNavigation/AppNavigation.selector', () => {
  describe('selector ', () => {
    it('should correctly handle an empty auth state', () => {
      const state = {
        auth: INITIAL_STATE,
      }
      // when ... we call the selector
      const result = SUT.default(state)
      // then ... should return result as expected
      expect(result).toEqual({ isAuthorised: false })
    })
    it('should check if the auth state is populated', () => {
      const state = {
        auth: {
          refreshToken: 'REFRESH_TOKEN',
          token: 'USER_TOKEN',
          expiresAt: 'EXPIRY_DATE',
        },
      }
      // when ... we call the selector
      const result = SUT.default(state)
      // then ... should return result as expected
      expect(result).toEqual({ isAuthorised: true })
    })
  })
})
