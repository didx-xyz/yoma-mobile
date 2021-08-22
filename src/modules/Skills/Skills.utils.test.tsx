import { keys, repeat, zipObj } from 'ramda'

import * as SUT from './Skills.utils'

describe('modules/Skills/Skills.utils', () => {
  describe('extractFilteredSkillsByValue', () => {
    it('should extract skill name from entities', () => {
      //given ... actual entities shape
      const mockEntities = {
        key1: {
          key: 'key1',
          value: 'value1',
        },
        key2: {
          key: 'key2',
          value: 'value2',
        },
      }
      //when .. extractFilteredSkillsByValue
      const result = SUT.extractFilteredSkillsByValue('value1', mockEntities)

      //then
      expect(result).toEqual([
        {
          key: 'key1',
          value: 'value1',
        },
      ])
    })
    it('should return 20 skills if value is empty', () => {
      //given ...30 mocked skills list
      const mockEntities = zipObj(keys(repeat(0, 30)), repeat({ key: 'key', value: 'skill' }, 30))

      // when .. extractFilteredSkillsByValue with empty value
      const result = SUT.extractFilteredSkillsByValue('', mockEntities)

      //then .. return 20 skills
      expect(result).toHaveLength(20)
    })
  })
  describe('updateSkillsStateWithFiltered', () => {
    it('should extract skill name from entities', () => {
      //given ...
      const mockState = {
        filtered: null,
        ids: 'Ids array',
        entities: 'Normalised entities',
      }
      //when .. updateSkillsStateWithFiltered
      // @ts-ignore
      const result = SUT.updateSkillsStateWithFiltered(mockState, 'Filtered skills')

      //then
      expect(result).toEqual({
        filtered: 'Filtered skills',
        ids: 'Ids array',
        entities: 'Normalised entities',
      })
    })
  })
})
