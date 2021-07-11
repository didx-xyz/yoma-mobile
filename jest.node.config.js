const config = {
  testEnvironment: 'node',
  preset: 'react-native',
  transform: {
    '^.+\\.ts?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native)/.*)(?!(@react-native-google-signin)/.*)(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)',
  ],
  roots: ['<rootDir>/src'],
  testRegex: '(.+)[^ui]\\.test\\.ts[x]{0,1}$',
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  setupFiles: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    './__mocks__/react-native-modules/react-native-modules.js',
    './__mocks__/react-native-fbsdk-next/facebook-signin.js',
    './__mocks__/@react-native-google-signin/google-signin.js',
  ],
}

module.exports = config
