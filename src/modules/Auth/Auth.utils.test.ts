import * as SUT from './Auth.utils'

describe('modules/Auth/Auth.utils', () => {
  describe('selectCredentialsFromLoginPayload', () => {
    it('should return the auth credentials from the login payload', () => {
      // given ... an object in the shape of the successful login response
      const mockedAction = {
        type: 'LOGIN ACTION',
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
      const result = SUT.selectCredentialsFromLoginPayload(mockedAction)
      // then ... the credentials should be extracted correctly
      expect(result).toEqual({ token: 'USER_TOKEN', expiresAt: 'EXPIRES_AT' })
    })
  })
  describe('selectRefreshTokenFromLoginPayload', () => {
    it('should return the refresh token from the login payload', () => {
      // given ... an object in the shape of the successful login response
      const mockedAction = {
        type: 'LOGIN ACTION',
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
      const result = SUT.selectRefreshTokenFromLoginPayload(mockedAction)
      // then ... the credentials should be extracted correctly
      expect(result).toEqual('REFRESH_TOKEN')
    })
    it('should handle the refresh token not being available', () => {
      // given ... an object in the shape of the successful login response
      const mockedAction = {
        type: 'LOGIN ACTION',
        payload: {
          meta: {},
        },
      }
      // when ... we want to extract the credentials from the rest of the payload
      const result = SUT.selectRefreshTokenFromLoginPayload(mockedAction)
      // then ... the credentials should be extracted correctly
      expect(result).toEqual(null)
    })
  })
})
