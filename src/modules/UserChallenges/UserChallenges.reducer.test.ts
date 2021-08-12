import SUT, { setUserChallenges, INITIAL_STATE, clearUserChallenges } from './UserChallenges.reducer'

describe('src/modules/User/Challenges/Challenges.redux', () => {
  describe('setUserChallenges', () => {
    it('should correctly add the challenges credentials', () => {
      // given ...an initial state
      const state = INITIAL_STATE

      // when ... we add new challenges
      const challengesMock = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'UserChallengeItem 1',
          id2: 'UserChallengeItem 2',
          id3: 'UserChallengeItem 3',
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
          idA: 'UserChallengeItem A',
          idB: 'UserChallengeItem B',
        },
      }

      // when ... we add new challenges
      const challengesMock = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'UserChallengeItem 1',
          id2: 'UserChallengeItem 2',
          id3: 'UserChallengeItem 3',
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
  describe('clearUserChallenges', () => {
    it('should correctly clear the challenges credentials', () => {
      // given ...an initial state
      const state = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'UserChallengeItem 1',
          id2: 'UserChallengeItem 2',
          id3: 'UserChallengeItem 3',
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
