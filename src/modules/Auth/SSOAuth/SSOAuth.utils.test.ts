import { GOOGLE_SIGNIN_WEBCLIENT_ID } from './SSOAuth.constants'
import { Providers } from './SSOAuth.types'
import * as SUT from './SSOAuth.utils'

describe('modules/SSOAuth/SSOAuth.utils', () => {
  describe('selectRegistrationCredentialsFromFacebook', () => {
    it('should return the user registration credentials from facebook auth payload', () => {
      //given ...
      const mockAuthData = {
        firstName: 'FIRST_NAME',
        lastName: 'LAST_NAME',
        email: 'EMAIL',
        imageURL: 'IMAGE_URL',
        applicationID: 'APPLICATION_ID',
        middleName: 'MIDDLENAME',
        name: 'NAME',
        userID: 'USER_ID',
        accessToken: 'TOKEN',
      }
      //when .. selectRegistrationCredentialsFromFacebook
      const result = SUT.selectRegistrationCredentialsFromFacebook(mockAuthData)
      //then result should equal user registration data
      expect(result).toEqual({
        firstName: 'FIRST_NAME',
        lastName: 'LAST_NAME',
        email: 'EMAIL',
        provider: Providers.Facebook,
        providerKey: 'APPLICATION_ID',
        token: 'TOKEN',
      })
    })
  })
  describe('selectRegistrationCredentialsFromGoogle', () => {
    it('should return the user registration credentials from google auth payload', () => {
      //given ...
      const mockAuthData = {
        idToken: 'TOKEN',
        user: {
          email: 'EMAIL',
          familyName: 'LAST_NAME',
          givenName: 'FIRST_NAME',
          id: 'ID',
          userId: 'USER_ID',
          name: 'NAME',
          photo: 'PHOTO',
        },
      }

      //when .. selectRegistrationCredentialsFromFacebook
      const result = SUT.selectRegistrationCredentialsFromGoogle(mockAuthData)
      //then result should equal user registration data
      expect(result).toEqual({
        provider: Providers.Google,
        email: 'EMAIL',
        firstName: 'FIRST_NAME',
        lastName: 'LAST_NAME',
        providerKey: GOOGLE_SIGNIN_WEBCLIENT_ID,
        token: 'TOKEN',
      })
    })
  })
  describe('selectLoginCredentialsFromFacebook', () => {
    it('should return the user login credentials from facebook auth payload', () => {
      //given ...
      const mockAuthData = {
        firstName: 'FIRST_NAME',
        lastName: 'LAST_NAME',
        email: 'EMAIL',
        imageURL: 'IMAGE_URL',
        applicationID: 'APPLICATION_ID',
        middleName: 'MIDDLENAME',
        name: 'NAME',
        userID: 'USER_ID',
        accessToken: 'TOKEN',
      }

      //when .. selectLoginCredentialsFromFacebook
      const result = SUT.selectLoginCredentialsFromFacebook(mockAuthData)
      //then result should equal facebook login data
      expect(result).toEqual({
        provider: Providers.Facebook,
        providerKey: 'APPLICATION_ID',
        token: 'TOKEN',
      })
    })
  })
  describe('selectLoginCredentialsFromGoogle', () => {
    it('should return the user login credentials from google auth payload', () => {
      //given ...
      const mockAuthData = {
        idToken: 'TOKEN',
        user: {
          email: 'EMAIL',
          familyName: 'LAST_NAME',
          givenName: 'FIRST_NAME',
          id: 'ID',
          userId: 'USER_ID',
          name: 'NAME',
          photo: 'PHOTO',
        },
      }
      //when .. selectLoginCredentialsFromFacebook
      const result = SUT.selectLoginCredentialsFromGoogle(mockAuthData)
      //then result should equal facebook login data
      expect(result).toEqual({
        provider: Providers.Google,
        providerKey: GOOGLE_SIGNIN_WEBCLIENT_ID,
        token: 'TOKEN',
      })
    })
  })
})
