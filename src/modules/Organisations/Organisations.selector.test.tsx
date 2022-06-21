import { rootStateFixture } from '~/redux/redux.fixture'

import * as SUT from './Organisations.selector'

describe('modules/Organisations/Organisations.selector', () => {
  describe('selectOrganisations ', () => {
    it('should return organisations property of the root state', () => {
      const stateMock = rootStateFixture({
        organisations: {
          ids: 'IDS_ARRAY',
          entities: 'ORGANISATIONS_ENTITIES',
        },
      })
      // when ... we call the selector
      const result = SUT.selectOrganisations(stateMock)

      // then ... should return result as expected
      expect(result).toEqual({
        ids: 'IDS_ARRAY',
        entities: 'ORGANISATIONS_ENTITIES',
      })
    })
    it('should return the default organisations state', () => {
      const state = rootStateFixture()
      // when ... we call the selector
      const result = SUT.selectOrganisations(state)

      // then ... should return result as expected
      expect(result).toEqual(state.organisations)
    })
  })
  describe('selectOrganisationsList ', () => {
    it('should return organisations list as object of label and value', () => {
      const stateMock = rootStateFixture({
        organisations: {
          ids: ['key1'],
          entities: { key1: { key: 'key1', value: 'skill 1' } },
        },
      })
      // when ... we call the selector
      const result = SUT.selectOrganisationsList(stateMock)

      // then ... should return result as expected
      expect(result).toEqual([{ label: 'skill 1', value: 'key1' }])
    })
  })
})
