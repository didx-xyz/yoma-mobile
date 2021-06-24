import * as SUT from './Social.utils'

describe('modules/SSO/SSO.utils', () => {
  describe('selectUserDataFromFacebookAuth', () => {
    it('should return the user credentials from facebook auth payload', () => {
      // given ... an object in the shape of the successful login response
      const mockedData = {
        accessToken: 'TOKEN',
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

      const result = SUT.selectUserDataFromFacebookAuth(mockedData)
      console.log('result', result)
    })
  })
  describe('selectUserDataFromGoogleAuth', () => {
    it('should return the user credentials from google auth payload', () => {
      // given ... an object in the shape of the successful login response
      const mockedData = {
        idToken: 'DATA',
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

      const result = SUT.selectUserDataFromGoogleAuth(mockedData)
      console.log('result', result)
    })
  })
})
