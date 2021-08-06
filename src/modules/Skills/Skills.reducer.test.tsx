import { rootStateFixture } from 'redux/redux.test.fixtures'

import SUT, { clearSkills, INITIAL_STATE, setFilteredSkills, setSkillEntities } from './Skills.reducer'

describe('modules/Skills/Skills.reducer', () => {
  describe('setSkillEntities', () => {
    it('should set the Skills credentials correctly', () => {
      // given ....
      const mockState = INITIAL_STATE
      const mockData = [
        {
          key: 'SOME_KEY',
          value: 'SOME_VALUE',
        },
      ]
      // when ... we set the Skills
      const action = setSkillEntities(mockData)
      const result = SUT(mockState, action)
      // then ... should set the skillEntities correctly
      expect(result.skillEntities).toEqual(mockData)
    })
  })
  describe('setFilteredSkills', () => {
    it('should set the Skills credentials correctly', () => {
      // given ....
      const mockState = INITIAL_STATE
      const mockData = [
        {
          key: 'SOME_KEY',
          value: 'SOME_VALUE',
        },
      ]
      // when ... we set the Skills
      const action = setFilteredSkills(mockData)
      const result = SUT(mockState, action)
      // then ... should set the FilteredSkills correctly
      expect(result.filteredSkills).toEqual(mockData)
    })
  })
  describe('clearSkills', () => {
    it('should clear skills state', () => {
      // give ... skills in state
      const mockState = rootStateFixture({
        skills: [
          {
            key: 'SOME_KEY',
            value: 'SOME_VALUE',
          },
        ],
      })
      //when we clearSkills
      const action = clearSkills()
      const result = SUT(mockState, action)
      // then ... should set the default Skills state
      expect(result).toEqual(INITIAL_STATE)
    })
  })
})
