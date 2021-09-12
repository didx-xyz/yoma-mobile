import { rootStateFixture } from '../../redux/redux.fixture'
import * as SUT from './Navigation.selector'

describe('modules/Navigation/Navigation.selector', () => {
  describe('selector ', () => {
    it('should return expected prop values from initial states', () => {
      const state = rootStateFixture()
      // when ... we call the selector
      const result = SUT.default(state)
      // then ... should return result as expected
      expect(result).toEqual({ isAuthorised: false })
    })
    it('should select props as expected when available in state', () => {
      const state = rootStateFixture({
        auth: {
          refreshToken: 'REFRESH_TOKEN',
          token: 'USER_TOKEN',
          expiresAt: 'EXPIRY_DATE',
        },
      })
      // when ... we call the selector
      const result = SUT.default(state)
      // then ... should return result as expected
      expect(result).toEqual({ isAuthorised: true })
    })
  })
})
