import SUT, { INITIAL_STATE, clearUserQualifications, setUserQualifications } from './UserQualifications.reducer'

describe('modules/UserQualifications/Qualifications.redux', () => {
  describe('setUserQualifications', () => {
    it('should correctly add the qualifications credentials', () => {
      // given ...an initial state
      const state = INITIAL_STATE

      // when ... we add new qualifications
      const qualificationsMock = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Qualification 1',
          id2: 'Qualification 2',
          id3: 'Qualification 3',
        },
      }
      // @ts-ignore
      const action = setUserQualifications(qualificationsMock)
      const result = SUT(state, action)

      // then ... state should include the new qualifications
      expect(result).toEqual(qualificationsMock)
    })
    it('should overwrite all current credentials', () => {
      // given ...an initial state
      const state = {
        ids: ['idA', 'idB'],
        entities: {
          idA: 'Qualification A',
          idB: 'Qualification B',
        },
      }

      // when ... we add new qualifications
      const qualificationsMock = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Qualification 1',
          id2: 'Qualification 2',
          id3: 'Qualification 3',
        },
      }
      // @ts-ignore - the shape of the data doesn't matter
      const action = setUserQualifications(qualificationsMock)
      // @ts-ignore - the shape of the data doesn't matter
      const result = SUT(state, action)

      // then ... state should include the new qualifications
      expect(result).toEqual(qualificationsMock)
    })
  })
  describe('clearUserQualifications', () => {
    it('should correctly clear the qualifications credentials', () => {
      // given ...an initial state
      const state = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Qualification 1',
          id2: 'Qualification 2',
          id3: 'Qualification 3',
        },
      }

      // when ... we clear qualifications
      const action = clearUserQualifications()
      // @ts-ignore
      const result = SUT(state, action)

      // then ... state should include the new qualifications
      expect(result).toEqual(INITIAL_STATE)
    })
  })
})
