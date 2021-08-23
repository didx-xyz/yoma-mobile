import { keys, repeat, zipObj } from 'ramda'
import { rootStateFixture } from 'redux/redux.test.fixtures'

import * as SUT from './Skills.selector'

describe('modules/Skills/Skills.selector', () => {
  describe('selectSkills ', () => {
    it('should return skills property of the root state', () => {
      const stateMock = rootStateFixture({
        searchTerm: '',
        skills: {
          ids: ['idA', 'idB'],
          entities: {
            idA: 'Skill A',
            idB: 'Skill B',
          },
        },
      })
      // when ... we call the selector
      const result = SUT.selectSkills(stateMock)

      // then ... should return result as expected
      expect(result).toEqual({
        searchTerm: '',
        ids: ['idA', 'idB'],
        entities: {
          idA: 'Skill A',
          idB: 'Skill B',
        },
      })
    })
    it('should return the default skills state', () => {
      const state = rootStateFixture()
      // when ... we call the selector
      const result = SUT.selectSkills(state)

      // then ... should return result as expected
      expect(result).toEqual(state.skills)
    })
  })

  describe('selectEntities ', () => {
    it('should return entities property of the skills state', () => {
      const stateMock = rootStateFixture({
        skills: {
          ids: ['idA', 'idB'],
          entities: {
            idA: 'Skill A',
            idB: 'Skill B',
          },
        },
      })
      // when ... we call the selector
      const result = SUT.selectEntities(stateMock)

      // then ... should return result as expected
      expect(result).toEqual({
        idA: 'Skill A',
        idB: 'Skill B',
      })
    })
  })

  describe('selectFiltered', () => {
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
      const result = SUT.selectFiltered(mockState)

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
      const mockState = {
        searchTerm: '',
        ids: keys(repeat(0, 30)),
        entities: zipObj(keys(repeat(0, 30)), repeat({ key: 'key', value: 'skill' }, 30)),
      }

      // when .. selectFiltered with empty value
      const result = SUT.selectFiltered(mockState)

      //then .. return 20 skills
      expect(result).toHaveLength(20)
    })
  })
})
