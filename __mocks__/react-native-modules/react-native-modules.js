const nativeModules = jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native')

  RN.NativeModules.RNGoogleSignin = {
    BUTTON_SIZE_ICON: 0,
    BUTTON_SIZE_STANDARD: 0,
    BUTTON_SIZE_WIDE: 0,
    BUTTON_COLOR_AUTO: 0,
    BUTTON_COLOR_LIGHT: 0,
    BUTTON_COLOR_DARK: 0,
    SIGN_IN_CANCELLED: '0',
    IN_PROGRESS: '1',
    PLAY_SERVICES_NOT_AVAILABLE: '2',
    SIGN_IN_REQUIRED: '3',
    configure: jest.fn(),
    signIn: jest.fn(),
    currentUserAsync: jest.fn(),
    addEventListener: jest.fn(),
    requestPermissions: jest.fn(),
  }

  return RN
})

module.exports = nativeModules
