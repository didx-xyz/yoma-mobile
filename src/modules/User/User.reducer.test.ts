import SUT, { setUser } from './User.reducer'
import { USER_RESPONSE, userInitialStateFixture } from './User.test.fixtures'

describe('modules/User/User.reducer', () => {
  describe('setUser', () => {
    it('should update the user state', () => {
      // given ... no user data
      const stateMock = userInitialStateFixture()

      // when ... we set the response credentials
      const responseDataMock = USER_RESPONSE

      const action = setUser(responseDataMock)
      const result = SUT(stateMock, action)

      // then ... user state should be updated with the new data
      expect(result).toEqual(responseDataMock)
    })
  })
})
