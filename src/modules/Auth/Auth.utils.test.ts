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
  describe('extractMessageFromErrorPayload', () => {
    it('should get the message out of the error payload', () => {
      // given ... an object in the shape of the successful login response
      const mockedAction = {
        type: 'FAILURE ACTION',
        payload: {
          data: {
            meta: {
              message: 'ERROR MESSAGE',
            },
          },
        },
      }
      // when ... we want to extract the refresh token from the rest of the payload
      const result = SUT.extractMessageFromErrorPayload(mockedAction)
      // then ... the refresh token should be extracted correctly
      expect(result).toEqual('ERROR MESSAGE')
    })
    it('should handle the refresh token not being available', () => {
      // given ... a data without a refresh token
      const mockedAction = {
        type: 'FAILURE ACTION',
        payload: {},
      }
      // when ... we want to extract the refresh token but it doesn't exists
      const result = SUT.extractRefreshTokenFromAuthorizedPayload(mockedAction)
      // then ... we should return the fallback value of an empty string
      expect(result).toEqual('')
    })
  })
  describe('selectLoginCredentialsFromRegistration', () => {
    it('should return the user email address and password from registration data', () => {
      // given ... an object in the shape of the successful reegistration
      const mockState = {
        firstName: 'FIRST NAME',
        lastName: 'LAST NAME',
        email: 'USER EMAIL',
        countryAlpha2: 'COUNTRY CODE',
        password: 'USER PASSWORD',
        confirmPassword: 'USER PASSWORD',
        privacyInd: true,
      }
      const result = SUT.selectLoginCredentialsFromRegistration(mockState)
      // then ... should return email and password
      expect(result).toEqual({ email: 'USER EMAIL', password: 'USER PASSWORD' })
    })
    it('should handle the empty registration credentials', () => {
      const mockState = {}
      const result = SUT.selectLoginCredentialsFromRegistration(mockState)
      // then ... we should return the fallback value of an empty object
      expect(result).toEqual({})
    })
  })
})
