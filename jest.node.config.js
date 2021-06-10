const config = {
  testEnvironment: 'node',
  preset: 'react-native',
  transform: {
    '^.+\\.ts?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)',
  ],
  roots: ['<rootDir>/src'],
  testRegex: '(.+)[^ui]\\.test\\.ts[x]{0,1}$',
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  setupFiles: [
      "./__mocks__/@react-native-async-storage/jestSetupFile.js",
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
}

module.exports = config
