import { rootStateFixture } from 'redux/redux.test.fixtures'

import * as SUT from './UserCredentials.selector'
import { USER_CREDENTIALS_RESPONSE } from './UserCredentials.test.fixtures'

describe('modules/UserCredentials/UserCredentials.selector', () => {
  describe('selectUserCredentials ', () => {
    it('should return user credentials property of the root state', () => {
      const stateMock = rootStateFixture({
        userCredentials: USER_CREDENTIALS_RESPONSE,
      })
      // when ... we call the selector
      const result = SUT.selectUserCredentials(stateMock)
      // then ... should return result as expected
      expect(result).toEqual(USER_CREDENTIALS_RESPONSE)
    })
    it('should return the default user credentials state', () => {
      const state = rootStateFixture()
      // when ... we call the selector
      const result = SUT.selectUserCredentials(state)
      // then ... should return result as expected
      expect(result).toEqual(state.userCredentials)
    })
  })
})
