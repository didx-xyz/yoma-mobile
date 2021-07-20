const facebookLoginMock = jest.mock('react-native-fbsdk-next', () => ({
  LoginManager: {
    logInWithPermissions: _ => ({
      isCancelled: false,
    }),
  },
  Profile: { getCurrentProfile: _ => ({ profile: 'USER_PROFILE' }) },
  AccessToken: {
    getCurrentAccessToken: _ => ({ token: 'TOKEN' }),
  },
}))

module.exports = facebookLoginMock
