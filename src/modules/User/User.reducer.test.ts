import { rootStateFixture } from '../../redux/redux.test.fixtures'
import { USER_RESPONSE } from './../Profile/Profile.constants'
import SUT, { setUser } from './User.reducer'

describe('modules/User/User.reducer', () => {
  describe('setUser', () => {
    it('should return user data from login payload', () => {
      // given ... there are are credentials in user state
      const state = rootStateFixture()
      const mockReponseData = {
        ...USER_RESPONSE,
      }
      // when ... we set the response credentials
      const action = setUser(mockReponseData)
      const result = SUT(state, action)
      // then ... user state should equal the credentials
      expect(result).toEqual(mockReponseData)
    })
  })
})
