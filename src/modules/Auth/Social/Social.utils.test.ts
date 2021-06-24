import * as SUT from './Social.utils'

describe('modules/Social/Social.utils', () => {
  describe('mapFacebookRegistrationData', () => {
    it('should return the user credentials from facebook auth payload', () => {
      // given ... an object in the shape of the successful login response
      const mockedData = {
        provider: 'facebook',
        email: 'DATA',
        firstName: 'DATA',
        imageURL: 'DATA',
        lastName: 'DATA',
        linkURL: 'DATA',
        middleName: 'DATA',
        name: 'DATA',
        userID: 'DATA',
        accessToken: 'TOKEN',
      }

      const result = SUT.mapFacebookRegistrationData(mockedData)
      console.log('result', result)
    })
  })
  describe('mapGoogleRegistrationData', () => {
    it('should return the user credentials from google auth payload', () => {
      // given ... an object in the shape of the successful login response
      const mockedData = {
        idToken: 'TOKEN',
        provider: 'google',
        user: {
          email: 'DATA',
          familyName: 'DATA',
          givenName: 'DATA',
          id: 'DATA',
          name: 'DATA',
          photo: 'DATA',
        },
      }

      const result = SUT.mapGoogleRegistrationData(mockedData)
      console.log('result', result)
    })
  })
  describe('mapFacebookLoginData', () => {
    it('should return the user credentials from facebook auth payload', () => {
      // given ... an object in the shape of the successful login response
      const mockedData = {
        provider: 'facebook',
        email: 'DATA',
        firstName: 'DATA',
        imageURL: 'DATA',
        lastName: 'DATA',
        linkURL: 'DATA',
        middleName: 'DATA',
        name: 'DATA',
        userID: 'DATA',
      }

      const result = SUT.mapFacebookLoginData(mockedData, mockedData)
    })
  })
  describe('mapGoogleLoginData', () => {
    it('should return the user credentials from google auth payload', () => {
      // given ... an object in the shape of the successful login response
      const mockedData = {
        idToken: 'TOKEN',
        provider: 'google',
        user: {
          email: 'DATA',
          familyName: 'DATA',
          givenName: 'DATA',
          id: 'DATA',
          name: 'DATA',
          photo: 'DATA',
        },
      }

      const result = SUT.mapGoogleLoginData(mockedData)
      console.log('result', result)
    })
  })
})
