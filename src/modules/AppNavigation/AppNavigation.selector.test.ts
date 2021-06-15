import { INITIAL_STATE } from 'modules/Auth/Auth.reducer'

import * as SUT from './AppNavigation.selector'

describe('modules/AppNavigation/AppNavigation.selector', () => {
  describe('selector ', () => {
    it('should set isAuthorised property value to false', () => {
      const state = {
        auth: INITIAL_STATE,
      }
      // when ... we call the selector
      const result = SUT.default(state)
      // then ... should return result as expected
      expect(result).toEqual({ isAuthorised: false })
    })
    it('should set isAuthorised property value to true', () => {
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
