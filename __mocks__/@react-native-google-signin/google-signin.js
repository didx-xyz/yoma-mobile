const googleSignIn = jest.mock('@react-native-google-signin/google-signin', () => ({ GoogleSignIn: jest.fn() }))

module.exports = googleSignIn
