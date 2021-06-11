const config = {
  testEnvironment: 'node',
  preset: 'react-native',
  transform: {
    '^.+\\.ts?(x)$': 'babel-jest',
  },
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.ui.test.ts?(x)'],
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  transformIgnorePatterns: ['node_modules/(?!(jest-)?react-native|@react-native-community|@react-navigation)'],
}

module.exports = config
