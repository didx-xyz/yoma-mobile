import { keys, repeat, zipObj } from 'ramda'

import * as SUT from './Skills.utils'

describe('modules/Skills/Skills.utils', () => {
  describe('selectFilterSkillsByTerm', () => {
    it('should extract skill name from entities', () => {
      //given ... actual state shape
      const mockState = {
        searchTerm: 'value1',
        ids: ['key1', 'key2'],
        entities: {
          key1: {
            key: 'key1',
            value: 'value1',
          },
          key2: {
            key: 'key2',
            value: 'value2',
          },
        },
      }

      //when .. selectFiltered
      const result = SUT.selectFilterSkillsByTerm(mockState)

      //then
      expect(result).toEqual([
        {
          key: 'key1',
          value: 'value1',
        },
      ])
    })
    it('should return 20 skills if value is empty', () => {
      //given ...mocked state with 30 skills
      const ids = keys(repeat(0, 30))
      const mockState = {
        searchTerm: '',
        ids,
        entities: zipObj(ids, repeat({ key: 'key', value: 'skill' }, 30)),
      }

      // when .. selectFiltered with empty value
      const result = SUT.selectFilterSkillsByTerm(mockState)

      //then .. return 20 skills
      expect(result).toHaveLength(20)
    })
  })
  describe('updateStateWithSearchTerm', () => {
    it('should update skills state with search term', () => {
      //given ...
      const mockState = {
        searchTerm: '',
        ids: 'Ids array',
        entities: 'Normalised entities',
      }
      //when .. updateStateWithSearchTerm
      // @ts-ignore
      const result = SUT.updateStateWithSearchTerm(mockState, 'Filter Search Term')

      //then
      expect(result).toEqual({
        searchTerm: 'Filter Search Term',
        ids: 'Ids array',
        entities: 'Normalised entities',
      })
    })
  })
})
