import { rootStateFixture } from '~/redux/redux.fixture'

import * as SUT from './CountrySelectField.selector'

describe('modules/Countries/Countries.selector', () => {
  describe('selectCountriesWithCode', () => {
    it('should return and empty ids array and empty entities object', () => {
      const state = rootStateFixture()
      // when ... we call the selector
      const result = SUT.selectCountriesWithCode(state)
      // then ... should return result as expected
      expect(result).toEqual([])
    })
    it('should return countries of the root state', () => {
      const stateMock = rootStateFixture({
        countries: {
          ids: ['C3', 'C1', 'C2'],
          entities: {
            C3: { name: 'COUNTRY 003' },
            C1: { name: 'COUNTRY 001' },
            C2: { name: 'COUNTRY 002' },
          },
        },
      })

      // when ... we call the selector
      const result = SUT.selectCountriesWithCode(stateMock)

      // then ... should return result as expected
      expect(result).toEqual([
        { name: 'COUNTRY 003', code: 'C3' },
        { name: 'COUNTRY 001', code: 'C1' },
        { name: 'COUNTRY 002', code: 'C2' },
      ])
    })
  })
  describe('default', () => {
    it('should return and empty ids array and empty entities object', () => {
      const state = rootStateFixture()
      // when ... we call the selector
      const result = SUT.default(state)
      // then ... should return result as expected
      expect(result).toEqual({
        ids: [],
        entities: {},
      })
    })
    it('should return countries of the root state', () => {
      const stateMock = rootStateFixture({
        countries: {
          ids: ['C3', 'C1', 'C2'],
          entities: {
            C3: { name: 'COUNTRY 003' },
            C1: { name: 'COUNTRY 001' },
            C2: { name: 'COUNTRY 002' },
          },
        },
      })

      // when ... we call the selector
      const result = SUT.default(stateMock)

      // then ... should return result as expected
      expect(result).toEqual({
        ids: ['C3', 'C1', 'C2'],
        entities: {
          C3: { name: 'COUNTRY 003', code: 'C3' },
          C1: { name: 'COUNTRY 001', code: 'C1' },
          C2: { name: 'COUNTRY 002', code: 'C2' },
        },
      })
    })
  })
})
