import { INITIAL_STATE } from 'modules/Auth/Auth.reducer'

import * as SUT from './App.selector'

describe('modules/App/App.selector', () => {
  describe('selector ', () => {
    it('should return expected prop values from initial states', () => {
      const state = {
        auth: INITIAL_STATE,
      }
      // when ... we call the selector
      const result = SUT.default(state)
      // then ... should return result as expected
      expect(result).toEqual({ isAuthorised: false })
    })
    it('should select props as expected when available in state', () => {
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
