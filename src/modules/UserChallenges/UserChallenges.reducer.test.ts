import SUT, {
  INITIAL_STATE,
  clearFormValues,
  clearUserChallenges,
  setFormValues,
  setUserChallenges,
  updateUserChallenges,
} from './UserChallenges.reducer'

describe('modules/UserChallenges/Challenges.redux', () => {
  describe('setUserChallenges', () => {
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
      const action = setUserChallenges(challengesMock)
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
      const action = setUserChallenges(challengesMock)
      // @ts-ignore - the shape of the data doesn't matter
      const result = SUT(state, action)

      // then ... state should include the new challenges
      expect(result).toEqual(challengesMock)
    })
  })
  describe('updateUserChallenges', () => {
    it('should correctly add the challenge credentials', () => {
      // given ...an initial state
      const state = INITIAL_STATE

      // when ... we add new challenges
      const challengesMock = {
        ids: ['id1'],
        entities: {
          id1: 'Challenge 1',
        },
      }
      // @ts-ignore
      const action = updateUserChallenges(challengesMock)
      const result = SUT(state, action)

      // then ... state should include the new challenges
      expect(result).toEqual(challengesMock)
    })
    it('should update current credentials with new credentials', () => {
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
      const action = updateUserChallenges(challengesMock)
      // @ts-ignore - the shape of the data doesn't matter
      const result = SUT(state, action)

      // then ... state should include the new challenges
      expect(result).toEqual({
        ids: ['idA', 'idB', 'id1', 'id2', 'id3'],
        entities: {
          idA: 'Challenge A',
          idB: 'Challenge B',
          id1: 'Challenge 1',
          id2: 'Challenge 2',
          id3: 'Challenge 3',
        },
      })
    })
  })
  describe('setFormValues', () => {
    it('should correctly clear the form values', () => {
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
      // @ts-ignore - file shape doesn't matter for the test
      const action = setFormValues({ file: 'SOME FILE DATA' })
      // @ts-ignore
      const result = SUT(state, action)

      // then ... state should include the new challenges
      expect(result).toEqual({
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Challenge 1',
          id2: 'Challenge 2',
          id3: 'Challenge 3',
        },
        formValues: { file: 'SOME FILE DATA' },
      })
    })
  })
  describe('clearFormValues', () => {
    it('should correctly clear the form values', () => {
      // given ...an initial state
      const state = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Challenge 1',
          id2: 'Challenge 2',
          id3: 'Challenge 3',
        },
        formValues: { file: 'SOME FILE DATA' },
      }

      // when ... we clear challenges
      const action = clearFormValues()
      // @ts-ignore
      const result = SUT(state, action)

      // then ... state should include the new challenges
      expect(result).toEqual({
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Challenge 1',
          id2: 'Challenge 2',
          id3: 'Challenge 3',
        },
      })
    })
  })
  describe('clearUserChallenges', () => {
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
      const action = clearUserChallenges()
      // @ts-ignore
      const result = SUT(state, action)

      // then ... state should include the new challenges
      expect(result).toEqual(INITIAL_STATE)
    })
  })
})
