import { rootStateFixture } from 'redux/redux.test.fixtures'

import * as SUT from './Skills.selector'

describe('modules/Skills/Skills.selector', () => {
  describe('selectSkills ', () => {
    it('should return skills property of the root state', () => {
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
      const result = SUT.selectSkills(stateMock)

      // then ... should return result as expected
      expect(result).toEqual({
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
  describe('selectFiltered ', () => {
    it('should return filtered property of the skills state', () => {
      const stateMock = rootStateFixture({
        skills: {
          filtered: [
            {
              idA: 'Skill A',
              idB: 'Skill B',
            },
          ],
          ids: ['idA', 'idB'],
          entities: {
            idA: 'Skill A',
            idB: 'Skill B',
          },
        },
      })
      // when ... we call the selector
      const result = SUT.selectFiltered(stateMock)

      // then ... should return result as expected
      expect(result).toEqual([
        {
          idA: 'Skill A',
          idB: 'Skill B',
        },
      ])
    })
  })
})
