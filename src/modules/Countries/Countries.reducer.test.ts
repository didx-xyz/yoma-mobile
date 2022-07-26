import { rootStateFixture } from '~/redux/redux.fixture'

import SUT, { INITIAL_STATE, clearCountries, setCountries } from './Countries.reducer'

describe('modules/Countries/Countries.reducer', () => {
  describe('setCountries', () => {
    it('should update the user state', () => {
      // given ... no countries data
      const stateMock = INITIAL_STATE

      // when ... we set the countries
      const responseDataMock = {
        ids: ['C1', 'C2', 'C3'],
        entities: {
          C1: 'COUNTRY 001',
          C2: 'COUNTRY 002',
          C3: 'COUNTRY 003',
        },
      }

      // @ts-ignore - strong typing not necessary for passing test
      const action = setCountries(responseDataMock)
      const result = SUT(stateMock, action)

      // then ... user state should be updated with the new data
      expect(result).toEqual(responseDataMock)
    })
  })
  describe('clearCountries', () => {
    it('should clear user state', () => {
      // given ... countries data in state
      const state = rootStateFixture({
        countries: {
          ids: ['C1', 'C2', 'C3'],
          entities: {
            C1: 'COUNTRY 001',
            C2: 'COUNTRY 002',
            C3: 'COUNTRY 003',
          },
        },
      })
      // when we clear the countries data
      const action = clearCountries()
      const result = SUT(state, action)
      // then ... should have none of the countries avialable
      expect(result).toEqual(INITIAL_STATE)
    })
  })
})
