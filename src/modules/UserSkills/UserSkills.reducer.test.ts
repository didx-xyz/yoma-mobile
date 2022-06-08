import SUT, { INITIAL_STATE, clearUserSkills, setUserSkills, updateUserSkills } from './UserSkills.reducer'

describe('src/modules/User/Skills/Skills.reducer', () => {
  describe('setUserSkills', () => {
    it('should correctly add the userSkills data', () => {
      // given ...an initial state
      const state = INITIAL_STATE

      // when ... we set new skills
      const NORMALISED_SKILLS_MOCK = {
        ids: ['skill1', 'skill2', 'skill3'],
        entities: {
          skill1: 'SKILLS1',
          skill2: 'SKILLS2',
          skill3: 'SKILLS3',
        },
      }

      // @ts-ignore
      const action = setUserSkills(NORMALISED_SKILLS_MOCK)
      const result = SUT(state, action)

      // then ... state should include the new skills
      expect(result).toEqual({
        ids: ['skill1', 'skill2', 'skill3'],
        entities: {
          skill1: 'SKILLS1',
          skill2: 'SKILLS2',
          skill3: 'SKILLS3',
        },
      })
    })
    it('should override skills state', () => {
      // given ...an initial state
      const state = {
        ids: ['skill1', 'skill2'],
        entities: {
          skill1: 'SKILLS1',
          skill2: 'SKILLS2',
        },
      }

      // when ... we set new skills
      const NORMALISED_SKILLS_MOCK = {
        ids: ['skill3'],
        entities: {
          skill3: 'SKILLS3',
        },
      }
      // @ts-ignore - the shape of the data doesn't matter
      const action = setUserSkills(NORMALISED_SKILLS_MOCK)
      // @ts-ignore - the shape of the data doesn't matter
      const result = SUT(state, action)

      // then ... state should only be the new skills
      expect(result).toEqual({
        ids: ['skill3'],
        entities: {
          skill3: 'SKILLS3',
        },
      })
    })
  })
  describe('updateUserSkills', () => {
    it('should correctly add the userSkills data', () => {
      // given ...an initial state
      const state = INITIAL_STATE

      // when ... we set new skills
      const NORMALISED_SKILLS_MOCK = {
        ids: ['skill1', 'skill2', 'skill3'],
        entities: {
          skill1: 'SKILLS1',
          skill2: 'SKILLS2',
          skill3: 'SKILLS3',
        },
      }

      // @ts-ignore
      const action = updateUserSkills(NORMALISED_SKILLS_MOCK)
      const result = SUT(state, action)

      // then ... state should include the new skills
      expect(result).toEqual({
        ids: ['skill1', 'skill2', 'skill3'],
        entities: {
          skill1: 'SKILLS1',
          skill2: 'SKILLS2',
          skill3: 'SKILLS3',
        },
      })
    })
    it('should update skills state', () => {
      // given ...an initial state
      const state = {
        ids: ['skill1', 'skill2'],
        entities: {
          skill1: 'SKILLS1',
          skill2: 'SKILLS2',
        },
      }

      // when ... we set new skills
      const NORMALISED_SKILLS_MOCK = {
        ids: ['skill3'],
        entities: {
          skill3: 'SKILLS3',
        },
      }
      // @ts-ignore - the shape of the data doesn't matter
      const action = updateUserSkills(NORMALISED_SKILLS_MOCK)
      // @ts-ignore - the shape of the data doesn't matter
      const result = SUT(state, action)

      // then ... state should only be the new skills
      expect(result).toEqual({
        ids: ['skill1', 'skill2', 'skill3'],
        entities: {
          skill1: 'SKILLS1',
          skill2: 'SKILLS2',
          skill3: 'SKILLS3',
        },
      })
    })
  })
  describe('clearUserSkills', () => {
    it('should correctly clear the skills credentials', () => {
      // given ...an initial state
      const state = {
        ids: ['skill1', 'skill2', 'skill3'],
        entities: {
          skill1: 'SKILLS1',
          skill2: 'SKILLS2',
          skill3: 'SKILLS3',
        },
      }

      // when ... we clear skills
      const action = clearUserSkills()
      // @ts-ignore
      const result = SUT(state, action)

      // then ... state should be reverted to initial values (empty state)
      expect(result).toEqual(INITIAL_STATE)
    })
  })
})
