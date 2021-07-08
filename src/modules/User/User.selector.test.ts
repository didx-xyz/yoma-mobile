import { INITIAL_STATE } from '../User/User.reducer'
import { USER_RESPONSE } from './../Profile/Profile.constants'
import * as SUT from './User.selector'

describe('modules/User/User.selector', () => {
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
})
