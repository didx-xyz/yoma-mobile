import SUT, { clearSkills, INITIAL_STATE, setFilterSearchTerm, setSkills } from './Skills.reducer'

describe('modules/Skills/Skills.reducer', () => {
  describe('setSkills', () => {
    it('should correctly add the skills state', () => {
      // given ...an initial state
      const state = INITIAL_STATE

      // when ... we add new skills
      const skillsMock = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Skill 1',
          id2: 'Skill 2',
          id3: 'Skill 3',
        },
      }
      // @ts-ignore
      const action = setSkills(skillsMock)
      const result = SUT(state, action)

      // then ... state should include the new skills
      expect(result).toEqual(skillsMock)
    })
    it('should overwrite all current credentials', () => {
      // given ...an initial state
      const state = {
        ids: ['idA', 'idB'],
        entities: {
          idA: 'Skill A',
          idB: 'Skill B',
        },
      }

      // when ... we add new skills
      const skillsMock = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Skill 1',
          id2: 'Skill 2',
          id3: 'Skill 3',
        },
      }
      // @ts-ignore - the shape of the data doesn't matter
      const action = setSkills(skillsMock)
      // @ts-ignore - the shape of the data doesn't matter
      const result = SUT(state, action)

      // then ... state should include the new skills
      expect(result).toEqual(skillsMock)
    })
  })
  describe('setFilterSearchTerm', () => {
    it('should correctly set skills filter searchTerm', () => {
      // given ...an initial state
      const state = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Skill 1',
          id2: 'Skill 2',
          id3: 'Skill 3',
        },
      }
      // when ... we setFilterSearchTerm
      const action = setFilterSearchTerm('skill')

      // @ts-ignore
      const result = SUT(state, action)

      // then ... state should include the new skills
      expect(result).toEqual({
        searchTerm: 'skill',
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Skill 1',
          id2: 'Skill 2',
          id3: 'Skill 3',
        },
      })
    })
  })
  describe('clearSkills', () => {
    it('should clear skills state', () => {
      // give ... skills in state
      const state = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Skill 1',
          id2: 'Skill 2',
          id3: 'Skill 3',
        },
      }
      //when we clearSkills
      const action = clearSkills()
      const result = SUT(state, action)

      // then ... should set the default Skills state
      expect(result).toEqual(INITIAL_STATE)
    })
  })
})
