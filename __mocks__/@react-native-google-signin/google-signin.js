const googleSignIn = jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn(),
    signIn: jest.fn().mockReturnValue({
      name: 'USER_NAME',
      email: 'USER_EMAIL',
      idToken: 'ID_TOKEN',
    }),
  },
  statusCodes: {
    PLAY_SERVICES_NOT_AVAILABLE: false,
    SIGN_IN_REQUIRED: false,
    SIGN_IN_CANCELLED: false,
  },
}))

module.exports = googleSignIn
