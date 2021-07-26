import { rootStateFixture } from 'redux/redux.test.fixtures'

import SUT, { clearUserCredentials, INITIAL_STATE, setUserCredentials } from './UserCredentials.reducer'
import { USER_CREDENTIALS_RESPONSE } from './UserCredentials.test.fixtures'

describe('modules/UserCredentials/UserCredentials.reducer', () => {
  describe('setUserCredentials', () => {
    it('should set organisations correctly', () => {
      // given ....
      const mockState = rootStateFixture({})
      const mockData = USER_CREDENTIALS_RESPONSE
      // when ... we set the UserCredentials
      const action = setUserCredentials(mockData)
      const result = SUT(mockState, action)
      // then ... should set the UserCredentials correctly
      expect(result).toEqual(mockData)
    })
  })
  describe('clearUserCredentials', () => {
    it('should clear user credentials state', () => {
      // give ... UserCredentials in state
      const mockState = rootStateFixture({
        userCredentials: USER_CREDENTIALS_RESPONSE,
      })
      //when we clearUserCredentials
      const action = clearUserCredentials()
      const result = SUT(mockState, action)
      // then ... should set the default UserCredentials state
      expect(result).toEqual(INITIAL_STATE)
    })
  })
})
