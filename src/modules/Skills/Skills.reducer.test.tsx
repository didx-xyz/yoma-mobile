import { rootStateFixture } from 'redux/redux.test.fixtures'

import SUT, { clearSkills, INITIAL_STATE, setSkills } from './Skills.reducer'

describe('modules/Skills/Skills.reducer', () => {
  describe('setSkills', () => {
    it('should set the Skills credentials correctly', () => {
      // given ....
      const mockState = rootStateFixture({})
      const mockData = [
        {
          key: 'SOME_KEY',
          value: 'SOME_VALUE',
        },
      ]
      // when ... we set the Skills credentials
      const action = setSkills(mockData)
      const result = SUT(mockState, action)
      // then ... should set the skills correctly
      expect(result).toEqual(mockData)
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
