import { GOOGLE_SIGNIN_WEBCLIENT_ID } from './SSOAuth.constants'
import { Providers } from './SSOAuth.types'
import * as SUT from './SSOAuth.utils'

describe('modules/SSOAuth/SSOAuth.utils', () => {
  describe('extractRegistrationCredentialsFromFacebook', () => {
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
      //when .. extractRegistrationCredentialsFromFacebook
      const result = SUT.extractRegistrationCredentialsFromFacebook(mockAuthData)
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
  describe('extractRegistrationCredentialsFromGoogle', () => {
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

      //when .. extractRegistrationCredentialsFromFacebook
      const result = SUT.extractRegistrationCredentialsFromGoogle(mockAuthData)
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
  describe('extractLoginCredentialsFromFacebook', () => {
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

      //when .. extractLoginCredentialsFromFacebook
      const result = SUT.extractLoginCredentialsFromFacebook(mockAuthData)
      //then result should equal facebook login data
      expect(result).toEqual({
        provider: Providers.Facebook,
        providerKey: 'APPLICATION_ID',
        token: 'TOKEN',
      })
    })
  })
  describe('extractLoginCredentialsFromGoogle', () => {
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
      //when .. extractLoginCredentialsFromFacebook
      const result = SUT.extractLoginCredentialsFromGoogle(mockAuthData)
      //then result should equal facebook login data
      expect(result).toEqual({
        provider: Providers.Google,
        providerKey: GOOGLE_SIGNIN_WEBCLIENT_ID,
        token: 'TOKEN',
      })
    })
  })
  describe('onFacebookAuth', () => {
    it('should correctly return user authentication credentials from facebook', async () => {
      //given .. mocked auth response credentials
      const authResponse = { profile: 'USER_PROFILE', token: 'FACEBOOK_TOKEN' }

      //when user authenticates with facebook
      const mockFacebookConfigStub = {
        fbLoginManager: { logInWithPermissions: jest.fn().mockResolvedValue({ isCancelled: false }) },
        fbProfile: { getCurrentProfile: jest.fn().mockResolvedValue({ profile: 'USER_PROFILE' }) },
        fbAccessToken: { getCurrentAccessToken: jest.fn().mockResolvedValue({ token: 'FACEBOOK_TOKEN' }) },
      }
      const result = await SUT.onFacebookAuth(mockFacebookConfigStub)

      //then return response credentials
      expect(result).toEqual(authResponse)
    })
    it('should correctly handle cancelled facebook auth', async () => {
      //when user cancels authenticating with facebook
      const mockFacebookConfigStub = {
        fbLoginManager: { logInWithPermissions: jest.fn().mockResolvedValue({ isCancelled: true }) },
        fbProfile: { getCurrentProfile: jest.fn().mockResolvedValue({ profile: 'USER_PROFILE' }) },
        fbAccessToken: { getCurrentAccessToken: jest.fn().mockResolvedValue({ token: 'FACEBOOK_TOKEN' }) },
      }
      const result = await SUT.onFacebookAuth(mockFacebookConfigStub)

      //then return undefined
      expect(result).toBeUndefined()
    })
  })
  describe('onGoogleAuth', () => {
    it('should correctly return user authentication credentials from google', async () => {
      // given ... mock authentication response
      const authResponse = {
        name: 'USER_NAME',
        email: 'USER_EMAIL',
        idToken: 'ID_TOKEN',
      }

      ///when ... user authenticate with google
      const mockGoogleConfigStub = {
        googleSignIn: {
          configure: jest.fn(),
          hasPlayServices: jest.fn(),
          signIn: jest.fn().mockResolvedValue(authResponse),
        },
        googleStatusCodes: {
          PLAY_SERVICES_NOT_AVAILABLE: false,
          SIGN_IN_REQUIRED: false,
          SIGN_IN_CANCELLED: false,
        },
      }
      const result = await SUT.onGoogleAuth(mockGoogleConfigStub)
      //then ... validate user authentication data is returned
      expect(result).toEqual(authResponse)
    })
    it('should correctly handle cancelled google auth', async () => {
      ///when ... user cancels authenticating with google
      const statusCodes = {
        PLAY_SERVICES_NOT_AVAILABLE: 'PLAY_SERVICES_NOT_AVAILABLE',
        SIGN_IN_REQUIRED: 'SIGN_IN_REQUIRED',
        SIGN_IN_CANCELLED: 'SIGN_IN_CANCELLED',
      }
      const mockGoogleConfigStub = {
        googleSignIn: {
          configure: jest.fn(),
          hasPlayServices: jest.fn(),
          signIn: jest.fn().mockRejectedValue({ code: statusCodes.SIGN_IN_CANCELLED }),
        },
        googleStatusCodes: statusCodes,
      }
      const result = await SUT.onGoogleAuth(mockGoogleConfigStub)

      //then return undefined
      expect(result).toBeUndefined()
    })
  })
})
