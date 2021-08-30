import SUT, { clearUserSkills, INITIAL_STATE, setUserSkills } from './UserSkills.reducer'
import { USER_SKILLS_MOCK } from './UserSkills.test.fixtures'

describe('src/modules/User/Skills/Skills.reducer', () => {
  describe('setUserSkills', () => {
    it('should correctly add the userSkills data', () => {
      // given ...an initial state
      const state = INITIAL_STATE

      // when ... we set new skills

      // @ts-ignore
      const action = setUserSkills(USER_SKILLS_MOCK)
      const result = SUT(state, action)

      // then ... state should include the new skills
      expect(result).toEqual(USER_SKILLS_MOCK)
    })
    it('should update skills state', () => {
      // given ...an initial state
      const state = USER_SKILLS_MOCK

      // when ... we set new skills
      const skillsMock = [
        {
          skillName: 'Skill1',
          verifiedBy: {
            name: 'Name1',
            logoUrl: 'Url1',
          },
        },
      ]
      // @ts-ignore - the shape of the data doesn't matter
      const action = setUserSkills(skillsMock)
      // @ts-ignore - the shape of the data doesn't matter
      const result = SUT(state, action)

      // then ... state should include the new skills
      expect(result).toEqual([
        {
          skillName: 'Skill',
          verifiedBy: {
            name: 'Name',
            logoUrl: 'Url',
          },
        },
        {
          skillName: 'Skill1',
          verifiedBy: {
            name: 'Name1',
            logoUrl: 'Url1',
          },
        },
      ])
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
