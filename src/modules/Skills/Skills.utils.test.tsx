import * as SUT from './Skills.utils'

describe('modules/Skills/Skills.utils', () => {
  describe('extractSkillsByName', () => {
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
      //when .. extractSkillsByValue
      const result = SUT.extractFilteredSkillsByValue('value1', mockEntities)

      //then
      expect(result).toEqual([
        {
          key: 'key1',
          value: 'value1',
        },
      ])
    })
  })
  describe('updateSkillsStateWithFiltered', () => {
    it('should extract skill name from entities', () => {
      //given ...
      const mockState = {
        filtered: [],
        ids: ['key1'],
        entities: {
          key1: {
            key: 'key1',
            value: 'value1',
          },
        },
      }
      //when .. extractSkillsByName
      // @ts-ignore
      const result = SUT.updateSkillsStateWithFiltered(mockState, ['value1'])

      //then
      expect(result).toEqual({
        filtered: ['value1'],
        ids: ['key1'],
        entities: {
          key1: {
            key: 'key1',
            value: 'value1',
          },
        },
      })
    })
  })
})
