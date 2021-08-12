import { rootStateFixture } from 'redux/redux.test.fixtures'

import * as SUT from './Skills.selector'
import { SKILLS_STATE_MOCK } from './Skills.test.fixtures'

describe('modules/Skills/Skills.selector', () => {
  describe('selectSkills ', () => {
    it('should return skills property of the root state', () => {
      const stateMock = rootStateFixture({
        skills: SKILLS_STATE_MOCK,
      })
      // when ... we call the selector
      const result = SUT.selectSkills(stateMock)

      // then ... should return result as expected
      expect(result).toEqual(SKILLS_STATE_MOCK)
    })
    it('should return the default skills state', () => {
      const state = rootStateFixture()
      // when ... we call the selector
      const result = SUT.selectSkills(state)

      // then ... should return result as expected
      expect(result).toEqual(state.skills)
    })
  })
  describe('selectSkillValues ', () => {
    it('should return allValues property from the skills state', () => {
      const mockAllValues = ['VALUE', 'VALUE1']
      const stateMock = rootStateFixture({
        skills: {
          ...SKILLS_STATE_MOCK,
          allValues: mockAllValues,
        },
      })
      // when ... we call the selector
      const result = SUT.selectSkillValues(stateMock)

      // then ... should return result as expected
      expect(result).toEqual(mockAllValues)
    })
  })
  describe('selectFilteredSkills ', () => {
    it('should return filtered property from the root state', () => {
      const mockFiltered = ['VALUE', 'VALUE1']
      const stateMock = rootStateFixture({
        skills: {
          ...SKILLS_STATE_MOCK,
          filtered: mockFiltered,
        },
      })
      // when ... we call the selector
      const result = SUT.selectFilteredSkills(stateMock)

      // then ... should return result as expected
      expect(result).toEqual(mockFiltered)
    })
  })
})
