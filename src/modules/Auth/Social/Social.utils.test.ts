import { GOOGLE_SIGNIN_WEBCLIENT_ID } from './Social.constants'
import { Providers } from './Social.types'
import * as SUT from './Social.utils'

describe('modules/Social/Social.utils', () => {
  describe('selectRegistrationCredentialsFromFacebook', () => {
    it('should return the user registration credentials from facebook auth payload', () => {
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
      const result = SUT.selectRegistrationCredentialsFromFacebook(mockAuthData)
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

      const result = SUT.selectRegistrationCredentialsFromGoogle(mockAuthData)
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

      const result = SUT.selectLoginCredentialsFromFacebook(mockAuthData)
      expect(result).toEqual({
        provider: Providers.Facebook,
        providerKey: 'APPLICATION_ID',
        token: 'TOKEN',
      })
    })
  })
  describe('selectLoginCredentialsFromGoogle', () => {
    it('should return the user login credentials from google auth payload', () => {
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

      const result = SUT.selectLoginCredentialsFromGoogle(mockAuthData)
      expect(result).toEqual({
        provider: Providers.Google,
        providerKey: GOOGLE_SIGNIN_WEBCLIENT_ID,
        token: 'TOKEN',
      })
    })
  })
})
