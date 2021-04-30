import * as SUT from './Auth.utils'

describe('modules/Auth/Auth.utils', () => {
  describe('getCredentialsFromAuthSuccess', () => {
    it('should return the auth credentials from the server payload', () => {
      // given ... an object in the shape of the successful login response
      const mockedAction = {
        type: 'SOME ACTION',
        payload: {
          data: {
            refreshToken: 'REFRESH_TOKEN',
            token: 'USER_TOKEN',
            expiresAt: 'EXPIRES_AT',
            otherProperty: 'SOME OTHER PROPERTY',
          },
          meta: {},
        },
      }
      // when ... we want to extract the credentials from the rest of the payload
      const result = SUT.getCredentialsFromAuthSuccess(mockedAction)
      // then ... the credentials should be extracted correctly
      expect(result).toEqual({ refreshToken: 'REFRESH_TOKEN', token: 'USER_TOKEN', expiresAt: 'EXPIRES_AT' })
    })
  })
})
