import { rootStateFixture } from 'redux/redux.test.fixtures'

import * as SUT from './Organisations.selector'

describe('modules/Organisations/Organisations.selector', () => {
  describe('selectOrganisations ', () => {
    it('should return organisations property of the root state', () => {
      const stateMock = rootStateFixture({
        organisations: [
          {
            key: 'SOME_KEY',
            value: 'SOME_VALUE',
          },
        ],
      })
      // when ... we call the selector
      const result = SUT.selectOrganisations(stateMock)
      // then ... should return result as expected
      expect(result).toEqual([
        {
          key: 'SOME_KEY',
          value: 'SOME_VALUE',
        },
      ])
    })
    it('should return the default organisations state', () => {
      const state = rootStateFixture()
      // when ... we call the selector
      const result = SUT.selectOrganisations(state)
      // then ... should return result as expected
      expect(result).toEqual(state.organisations)
    })
  })
})
