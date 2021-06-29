import { USER_RESPONSE } from 'modules/Profile/Profile.constants'

import SUT, { setUserData } from './User.reducer'

describe('modules/User/User.reducer', () => {
  describe('setUserCredentials', () => {
    it('should return user data from login payload', () => {
      // given ... there are are credentials in user state
      const state = {}
      const mockReponseData = {
        ...USER_RESPONSE,
      }
      // when ... we set the response credentials
      const action = setUserData(mockReponseData)
      const result = SUT(state, action)
      // then ... user state should equal the credentials
      expect(result).toEqual(mockReponseData)
    })
  })
})
