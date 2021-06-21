module.exports = {
  root: true,
  rules: {
    semi: ['error', 'never'],
    'no-shadow': 'off',
  },
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
}
