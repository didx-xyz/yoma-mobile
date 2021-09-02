import SUT, { setUserQualifications, INITIAL_STATE, clearUserQualifications } from './UserQualifications.reducer'

describe('src/modules/User/Challenges/Challenges.redux', () => {
  describe('setUserQualifications', () => {
    it('should correctly add the challenges credentials', () => {
      // given ...an initial state
      const state = INITIAL_STATE

      // when ... we add new challenges
      const challengesMock = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Challenge 1',
          id2: 'Challenge 2',
          id3: 'Challenge 3',
        },
      }
      // @ts-ignore
      const action = setUserQualifications(challengesMock)
      const result = SUT(state, action)

      // then ... state should include the new challenges
      expect(result).toEqual(challengesMock)
    })
    it('should overwrite all current credentials', () => {
      // given ...an initial state
      const state = {
        ids: ['idA', 'idB'],
        entities: {
          idA: 'Challenge A',
          idB: 'Challenge B',
        },
      }

      // when ... we add new challenges
      const challengesMock = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Challenge 1',
          id2: 'Challenge 2',
          id3: 'Challenge 3',
        },
      }
      // @ts-ignore - the shape of the data doesn't matter
      const action = setUserQualifications(challengesMock)
      // @ts-ignore - the shape of the data doesn't matter
      const result = SUT(state, action)

      // then ... state should include the new challenges
      expect(result).toEqual(challengesMock)
    })
  })
  describe('clearUserQualifications', () => {
    it('should correctly clear the challenges credentials', () => {
      // given ...an initial state
      const state = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Challenge 1',
          id2: 'Challenge 2',
          id3: 'Challenge 3',
        },
      }

      // when ... we clear challenges
      const action = clearUserQualifications()
      // @ts-ignore
      const result = SUT(state, action)

      // then ... state should include the new challenges
      expect(result).toEqual(INITIAL_STATE)
    })
  })
})
