import { createMiddlewareStub } from '../../../tests/tests.utils'
import { actions as AuthActions } from '../Auth'
import { actions as UserActions } from '../User'
import * as SUT from './App.middleware'
import { fetchInitial, resetAppData } from './App.reducer'

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
jest.mock('react-native/Libraries/LogBox/LogBox')

describe('modules/App/App.middleware', () => {
  describe('appResetFlow', () => {
    it('should correctly handle an app reset action', () => {
      const create = createMiddlewareStub(jest)
      // given ... the resetAppData action is fired
      const action = resetAppData()
      const { store, next, invoke } = create(SUT.appResetFlow)

      invoke(action)
      // ... we validate that our actions were triggered
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalled()
    })
    it('should handle app reset action accurately', () => {
      const create = createMiddlewareStub(jest)

      // given ... the resetAppData action is fired
      const action = resetAppData()
      const { store, invoke } = create(SUT.appResetFlow)

      invoke(action)
      // ... we validate that our actions were triggered
      expect(store.dispatch).toHaveBeenCalledWith(AuthActions.clearAuth())
    })
  })
  describe('fetchInitialFlow', () => {
    it('should correctly handle being called', () => {
      const create = createMiddlewareStub(jest)
      // given ...

      // when ... we want to populate the required app data
      const action = fetchInitial()
      const { store, next, invoke } = create(SUT.fetchInitialFlow)

      invoke(action)

      // then ...
      // ... the action should be passed through
      expect(next).toHaveBeenCalledWith(action)

      // ... we should ensure that we are handling our action
      // ... by expecting that an action will be dispatched
      expect(store.dispatch).toHaveBeenCalled()
    })
    it('should fetch all required data', () => {
      // given ...

      // when ... we want to populate the required app data
      const create = createMiddlewareStub(jest)
      const action = fetchInitial()
      const { store, invoke } = create(SUT.fetchInitialFlow)

      invoke(action)

      // then ... we should fetch data from all expected endpoints
      expect(store.dispatch).toHaveBeenCalledWith(UserActions.fetchUserCredentials())
    })
  })
})
