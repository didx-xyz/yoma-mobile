const config = {
  testEnvironment: 'node',
  preset: 'react-native',
  transform: {
    '^.+\\.ts?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native)/.*)(?!(@react-native-google-signin)/.*)(?!(@react-navigation|react-navigation)/.*)(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)',
  ],
  roots: ['<rootDir>/src'],
  testRegex: '(.+)[^ui]\\.test\\.ts[x]{0,1}$',
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  setupFiles: [
    '<rootDir>/tests/jestSetup.js',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
}

module.exports = config
