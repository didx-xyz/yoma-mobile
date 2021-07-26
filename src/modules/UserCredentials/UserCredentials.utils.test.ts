import { USER_CREDENTIALS_RESPONSE } from './UserCredentials.test.fixtures'
import * as SUT from './UserCredentials.utils'

describe('modules/UserCredentials/UserCredentials.utils', () => {
  describe('extractUserCredentialsFromPayload', () => {
    it('should return the auth credentials from the login payload', () => {
      // given ... an object in the shape of the user credentials success action
      const mockedAction = {
        type: 'ACTION',
        payload: {
          data: USER_CREDENTIALS_RESPONSE,
          meta: {},
        },
      }

      // when ... we want to extract the credentials from the rest of the payload
      const result = SUT.extractUserCredentialsFromPayload(mockedAction)
      // then ... the credentials should be extracted correctly
      expect(result).toEqual(USER_CREDENTIALS_RESPONSE)
    })
  })
})
