import { rootStateFixture } from '~/redux/redux.fixture'

import * as SUT from './Countries.selector'

describe('modules/Countries/Countries.selector', () => {
  describe('selectCountries', () => {
    it('should return the default countries state', () => {
      const state = rootStateFixture()
      // when ... we call the selector
      const result = SUT.selectCountries(state)
      // then ... should return result as expected
      expect(result).toEqual(state.countries)
    })
    it('should return countries of the root state', () => {
      const stateMock = rootStateFixture({
        countries: {
          ids: ['C1', 'C2', 'C3'],
          entities: {
            C1: 'COUNTRY 001',
            C2: 'COUNTRY 002',
            C3: 'COUNTRY 003',
          },
        },
      })
      // when ... we call the selector
      const result = SUT.selectCountries(stateMock)
      // then ... should return result as expected
      expect(result).toEqual({
        ids: ['C1', 'C2', 'C3'],
        entities: {
          C1: 'COUNTRY 001',
          C2: 'COUNTRY 002',
          C3: 'COUNTRY 003',
        },
      })
    })
  })
})
