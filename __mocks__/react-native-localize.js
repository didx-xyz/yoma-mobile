const reactNativeLocalize = jest.createMockFromModule('react-native-localize', () => ({
  findBestAvailableLanguage: _x => ({
    languageTag: null,
  }),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  getLocales: jest.fn(),
}))

module.exports = reactNativeLocalize
