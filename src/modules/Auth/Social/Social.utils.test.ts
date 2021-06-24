import { GOOGLE_SIGNIN_WEBCLIENT_ID } from './Social.constants'
import { Providers } from './Social.types'
import * as SUT from './Social.utils'

describe('modules/Social/Social.utils', () => {
  describe('mapFacebookRegistrationData', () => {
    it('should return the user registration credentials from facebook auth payload', () => {
      const mockAuthData = {
        firstName: 'DATA',
        lastName: 'DATA',
        email: 'DATA',
        imageURL: 'DATA',
        applicationID: 'DATA',
        middleName: 'DATA',
        name: 'DATA',
        userID: 'DATA',
        accessToken: 'TOKEN',
      }

      const mockMappedData = {
        firstName: 'DATA',
        lastName: 'DATA',
        email: 'DATA',
        provider: Providers.Facebook,
        providerKey: 'DATA',
        token: 'TOKEN',
      }

      const result = SUT.mapFacebookRegistrationData(mockAuthData)
      expect(result).toEqual(mockMappedData)
    })
  })
  describe('mapGoogleRegistrationData', () => {
    it('should return the user registration credentials from google auth payload', () => {
      const mockAuthData = {
        idToken: 'TOKEN',
        user: {
          email: 'DATA',
          familyName: 'DATA',
          givenName: 'DATA',
          id: 'DATA',
          userId: 'DATA',
          name: 'DATA',
          photo: 'DATA',
        },
      }

      const mockMappedData = {
        firstName: 'DATA',
        lastName: 'DATA',
        email: 'DATA',
        provider: Providers.Google,
        providerKey: GOOGLE_SIGNIN_WEBCLIENT_ID,
        token: 'TOKEN',
      }

      const result = SUT.mapGoogleRegistrationData(mockAuthData)
      expect(result).toEqual(mockMappedData)
    })
  })
  describe('mapFacebookLoginData', () => {
    it('should return the user login credentials from facebook auth payload', () => {
      const mockAuthData = {
        firstName: 'DATA',
        lastName: 'DATA',
        email: 'DATA',
        imageURL: 'DATA',
        applicationID: 'DATA',
        middleName: 'DATA',
        name: 'DATA',
        userID: 'DATA',
        accessToken: 'TOKEN',
      }

      const mockMappedData = {
        provider: Providers.Facebook,
        providerKey: 'DATA',
        token: 'TOKEN',
      }

      const result = SUT.mapFacebookLoginData(mockAuthData)
      expect(result).toEqual(mockMappedData)
    })
  })
  describe('mapGoogleLoginData', () => {
    it('should return the user login credentials from google auth payload', () => {
      const mockAuthData = {
        idToken: 'TOKEN',
        user: {
          email: 'DATA',
          familyName: 'DATA',
          givenName: 'DATA',
          id: 'DATA',
          userId: 'DATA',
          name: 'DATA',
          photo: 'DATA',
        },
      }

      const mockMappedData = {
        provider: Providers.Google,
        providerKey: GOOGLE_SIGNIN_WEBCLIENT_ID,
        token: 'TOKEN',
      }

      const result = SUT.mapGoogleLoginData(mockAuthData)
      expect(result).toEqual(mockMappedData)
    })
  })
})
