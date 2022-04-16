import * as SUT from './Auth.utils'

describe('modules/Auth/Auth.utils', () => {
  describe('extractCredentialsFromAuthorizedPayload', () => {
    it('should return the auth credentials from the login payload', () => {
      // given ... an object in the shape of the successful login response
      const mockedAction = {
        type: 'LOGIN ACTION',
        payload: {
          refreshToken: 'REFRESH_TOKEN',
          token: 'USER_TOKEN',
          expiresAt: 'EXPIRES_AT',
          accessToken: 'TOKEN',
          accessTokenExpirationDate: 'EXPIRES_AT',
          idToken: 'ID_TOKEN',
          tokenType: 'TOKEN_TYPE',
          scopes: ['SCOPES'],
          tokenAdditionalParameters: { aKey: 'TOKEN_ADDITIONAL_PARAMETERS' },
          authorizeAdditionalParameters: { aKey: 'AUTHORIZE_ADDITIONAL_PARAMETERS' },
        },
      }

      // when ... we want to extract the credentials from the rest of the payload
      const result = SUT.extractCredentialsFromAuthorizedPayload(mockedAction)
      // then ... the credentials should be extracted correctly
      expect(result).toEqual({
        accessToken: 'TOKEN',
        accessTokenExpirationDate: 'EXPIRES_AT',
        idToken: 'ID_TOKEN',
        tokenType: 'TOKEN_TYPE',
        scopes: ['SCOPES'],
        tokenAdditionalParameters: { aKey: 'TOKEN_ADDITIONAL_PARAMETERS' },
        authorizeAdditionalParameters: { aKey: 'AUTHORIZE_ADDITIONAL_PARAMETERS' },
      })
    })
  })
  describe('prepareCredentials', () => {
    it('should rename the object keys', () => {
      // given ... an object in the shape of the successful login response
      const mockedAction = {
        accessToken: 'USER_TOKEN',
        accessTokenExpirationDate: 'EXPIRES_AT',
      }

      // when ... we want to extract the credentials from the rest of the payload
      const result = SUT.prepareCredentials(mockedAction)
      // then ... the credentials should be extracted correctly
      expect(result).toEqual({ token: 'USER_TOKEN', expiresAt: 'EXPIRES_AT' })
    })
  })
  describe('extractRefreshTokenFromAuthorizedPayload', () => {
    it('should return the refresh token from the login payload', () => {
      // given ... an object in the shape of the successful login response
      const mockedAction = {
        type: 'LOGIN ACTION',
        payload: {
          refreshToken: 'REFRESH_TOKEN',
          token: 'USER_TOKEN',
          expiresAt: 'EXPIRES_AT',
          accessToken: 'TOKEN',
          accessTokenExpirationDate: 'EXPIRES_AT',
          idToken: 'ID_TOKEN',
          tokenType: 'TOKEN_TYPE',
          scopes: ['SCOPES'],
          tokenAdditionalParameters: { aKey: 'TOKEN_ADDITIONAL_PARAMETERS' },
          authorizeAdditionalParameters: { aKey: 'AUTHORIZE_ADDITIONAL_PARAMETERS' },
        },
      }
      // when ... we want to extract the refresh token from the rest of the payload
      const result = SUT.extractRefreshTokenFromAuthorizedPayload(mockedAction)
      // then ... the refresh token should be extracted correctly
      expect(result).toBe('REFRESH_TOKEN')
    })
    it('should handle the refresh token not being available', () => {
      // given ... a data without a refresh token
      const mockedAction = {
        type: 'LOGIN ACTION',
        payload: {
          meta: {},
        },
      }
      // when ... we want to extract the refresh token but it doesn't exists
      const result = SUT.extractRefreshTokenFromAuthorizedPayload(mockedAction)
      // then ... we should return the fallback value of an empty string
      expect(result).toEqual('')
    })
  })
})
