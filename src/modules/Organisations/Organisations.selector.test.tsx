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
          ids: ['key4', 'key3', 'key2', 'key1'],
          entities: {
            key4: { key: 'key4', value: 'skill 4' },
            key3: { key: 'key3', value: 'skill 3' },
            key2: { key: 'key2', value: 'skill 2' },
            key1: { key: 'key1', value: 'skill 1' },
          },
        },
      })
      // when ... we call the selector
      const result = SUT.selectOrganisationsList(stateMock)

      // then ... should return result as expected
      expect(result).toEqual([
        { label: 'skill 1', value: 'key1' },
        { label: 'skill 2', value: 'key2' },
        { label: 'skill 3', value: 'key3' },
        { label: 'skill 4', value: 'key4' },
      ])
    })
  })
})
