import SUT, { clearUserSkills, INITIAL_STATE, setUserSkills } from './UserSkills.reducer'
import { USER_SKILLS_MOCK } from './UserSkills.test.fixtures'

describe('src/modules/User/Skills/Skills.reducer', () => {
  describe('setUserSkills', () => {
    it('should correctly add the userSkills data', () => {
      // given ...an initial state
      const state = INITIAL_STATE

      // when ... we set new skills
      const skillsMock = {}
      // @ts-ignore
      const action = setUserSkills(skillsMock)
      const result = SUT(state, action)

      // then ... state should include the new skills
      expect(result).toEqual(skillsMock)
    })
    it('should overwrite all current credentials', () => {
      // given ...an initial state
      const state = []

      // when ... we set new skills
      const skillsMock = USER_SKILLS_MOCK
      // @ts-ignore - the shape of the data doesn't matter
      const action = setUserSkills(skillsMock)
      // @ts-ignore - the shape of the data doesn't matter
      const result = SUT(state, action)

      // then ... state should include the new skills
      expect(result).toEqual(skillsMock)
    })
  })

  describe('clearUserSkills', () => {
    it('should correctly clear the skills credentials', () => {
      // given ...an initial state
      const state = USER_SKILLS_MOCK

      // when ... we clear skills
      const action = clearUserSkills()
      // @ts-ignore
      const result = SUT(state, action)

      // then ... state should include the new skills
      expect(result).toEqual(INITIAL_STATE)
    })
  })
})
