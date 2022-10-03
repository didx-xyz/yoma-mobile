import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'

/* eslint-disable no-undef */
jest.mock('react-native-localize', () => ({
  getLocales: () => [
    { countryCode: 'GB', languageTag: 'en-GB', languageCode: 'en', isRTL: false },
    { countryCode: 'US', languageTag: 'en-US', languageCode: 'en', isRTL: false },
    { countryCode: 'FR', languageTag: 'fr-FR', languageCode: 'fr', isRTL: false },
  ],

  getNumberFormatSettings: () => ({
    decimalSeparator: '.',
    groupingSeparator: ',',
  }),

  getCalendar: () => 'gregorian', // or "japanese", "buddhist"
  getCountry: () => 'US', // the country code you want
  getCurrencies: () => ['USD', 'EUR'], // can be empty array
  getTemperatureUnit: () => 'celsius', // or "fahrenheit"
  getTimeZone: () => 'Europe/Paris', // the timezone you want
  uses24HourClock: () => true,
  usesMetricSystem: () => true,

  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  findBestAvailableLanguage: () => ({
    languageTag: 'en-US',
    isRTL: false,
  }),
}))

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)
jest.mock('react-native-document-picker')
jest.mock('react-native/Libraries/LogBox/LogBox')
jest.mock('@sentry/react-native', () => ({
  init: () => jest.fn(),
  ReactNavigationInstrumentation: () => jest.fn(),
  ReactNativeTracing: () => jest.fn(),
  wrap: () => jest.fn(),
}))

function FormDataMock() {
  this.append = jest.fn()
  return 'formData'
}
global.FormData = FormDataMock
