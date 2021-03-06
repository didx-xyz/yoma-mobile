const config = {
  testEnvironment: 'node',
  preset: 'react-native',
  transform: {
    '^.+\\.ts?(x)$': 'babel-jest',
  },
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/*.ui.test.ts?(x)'],
  setupFiles: ['<rootDir>/tests/jest.setup.js', '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  moduleNameMapper: {
    'tests/(.*)': ['<rootDir>/tests/$1'],
  },
  resolver: undefined,
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native)/.*)(?!(@react-navigation|react-navigation)/.*)(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|react-navigation|@react-navigation/.*|sentry-expo|native-base|@sentry/.*)',
  ],
}

module.exports = config
