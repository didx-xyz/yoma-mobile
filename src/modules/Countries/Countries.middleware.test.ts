import { createMiddlewareMock } from 'tests/tests.utils'

import {
  getCountries,
  getCountriesSuccess,
  normaliseCountriesSuccess,
  setCountries,
} from '~/modules/Countries/Countries.reducer'

import * as SUT from './Countries.middleware'

describe('modules/Countries/Countries.middleware', () => {
  describe('getCountriesFlow', () => {
    it('should correctly handle being called', () => {
      // given ... we need to get the countries
      const create = createMiddlewareMock(jest)
      const action = getCountries()
      const countryListMock = {
        C1: 'COUNTRY 001',
        C2: 'COUNTRY 002',
        C3: 'COUNTRY 003',
      }
      // when ... we respond to the getCountries action
      // @ts-ignore - countriesList isn't 100% mapped to the type (Record<string, Country>)
      const { store, invoke, next } = create(SUT.getCountriesFlow({ countryList: countryListMock }))

      invoke(action)

      // then ...validate setUserOnAuthFlow
      expect(next).toHaveBeenCalledWith(action)
      // @ts-ignore - countriesList isn't 100% mapped to the type (Record<string, Country>)
      expect(store.dispatch).toHaveBeenCalledWith(getCountriesSuccess(countryListMock))
    })
  })
  describe('normaliseCountriesFlow', () => {
    it('should correctly handle being called', () => {
      // given ... we need to get the countries
      const create = createMiddlewareMock(jest)
      const countryListMock = {
        C1: 'COUNTRY 001',
        C2: 'COUNTRY 002',
        C3: 'COUNTRY 003',
      }
      // @ts-ignore - countriesList isn't 100% mapped to the type (Record<string, Country>)
      const action = getCountriesSuccess(countryListMock)

      // when ... we respond to the getCountries action
      const { store, invoke, next } = create(SUT.normaliseCountriesFlow)

      invoke(action)

      // then ...validate setUserOnAuthFlow
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalledWith(
        normaliseCountriesSuccess({
          ids: ['C1', 'C2', 'C3'],
          entities: {
            // @ts-ignore - adjusted for testing
            C1: 'COUNTRY 001',
            // @ts-ignore - adjusted for testing
            C2: 'COUNTRY 002',
            // @ts-ignore - adjusted for testing
            C3: 'COUNTRY 003',
          },
        }),
      )
    })
  })
  describe('setCountriesFlow', () => {
    it('should correctly handle being called', () => {
      // given ... we need to get the countries
      const create = createMiddlewareMock(jest)
      const normalisedCountriesMock = {
        ids: ['C1', 'C2', 'C3'],
        entities: {
          C1: 'COUNTRY 001',
          C2: 'COUNTRY 002',
          C3: 'COUNTRY 003',
        },
      }
      // @ts-ignore - countriesList isn't 100% mapped to the type (Record<string, Country>)
      const action = normaliseCountriesSuccess(normalisedCountriesMock)

      // when ... we respond to the getCountries action
      const { store, invoke, next } = create(SUT.setCountriesFlow)

      invoke(action)

      // then ...validate setUserOnAuthFlow
      expect(next).toHaveBeenCalledWith(action)
      // @ts-ignore - countriesList isn't 100% mapped to the type (Record<string, Country>)
      expect(store.dispatch).toHaveBeenCalledWith(setCountries(normalisedCountriesMock))
    })
  })
})
