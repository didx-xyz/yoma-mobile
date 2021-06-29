import { USER_RESPONSE } from './../Profile/Profile.constants'
import * as SUT from './User.utils'

describe('modules/User/User.utils', () => {
  describe('selectUserCredentialsFromLoginPayload', () => {
    it('should return user data from login payload', () => {
      // given ... the auth success response
      const credentials = {
        payload: {
          data: {
            data: {
              user: USER_RESPONSE,
            },
          },
        },
      }
      // when selectUserCredentialsFromLoginPayload
      const result = SUT.selectUserCredentialsFromLoginPayload(credentials)
      //then expect user response data
      expect(result).toEqual(USER_RESPONSE)
    })
  })
})
