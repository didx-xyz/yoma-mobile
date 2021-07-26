import { rootStateFixture } from 'redux/redux.test.fixtures'

import SUT, { clearOrganisations, INITIAL_STATE, setOrganisations } from './Organisations.reducer'

describe('modules/Organisations/Organisations.reducer', () => {
  describe('setOrganisations', () => {
    it('should set organisations correctly', () => {
      // given ....
      const mockState = rootStateFixture({})
      const mockData = [
        {
          key: 'SOME_KEY',
          value: 'SOME_VALUE',
        },
      ]
      // when ... we set the Organisations credentials
      const action = setOrganisations(mockData)
      const result = SUT(mockState, action)
      // then ... should set the organisations correctly
      expect(result).toEqual(mockData)
    })
  })
  describe('clearOrganisations', () => {
    it('should clear organisations state', () => {
      // give ... organisations in state
      const mockState = rootStateFixture({
        organisations: [
          {
            key: 'SOME_KEY',
            value: 'SOME_VALUE',
          },
        ],
      })
      //when we clearOrganisations
      const action = clearOrganisations()
      const result = SUT(mockState, action)
      // then ... should set the default Organisations state
      expect(result).toEqual(INITIAL_STATE)
    })
  })
})
