import { rootStateFixture } from '~/redux/redux.fixture'

import SUT from './CountrySelect.selector'

describe('modules/Countries/Countries.selector', () => {
  describe('default', () => {
    it('should return and empty ids array and empty entities object', () => {
      const state = rootStateFixture()
      // when ... we call the selector
      const result = SUT(state)
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
      const result = SUT(stateMock)

      // then ... should return result as expected
      expect(result).toEqual({
        ids: ['COUNTRY 001', 'COUNTRY 002', 'COUNTRY 003'],
        entities: {
          'COUNTRY 003': { name: 'COUNTRY 003', code: 'C3' },
          'COUNTRY 001': { name: 'COUNTRY 001', code: 'C1' },
          'COUNTRY 002': { name: 'COUNTRY 002', code: 'C2' },
        },
      })
    })
  })
})
