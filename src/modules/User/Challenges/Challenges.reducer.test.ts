import SUT, { setChallenges, INITIAL_STATE } from './Challenges.reducer'

describe('src/modules/User/Challenges/Challenges.redux', () => {
  describe('setChallenges', () => {
    it('should correctly set the challenges credentials', () => {
      // given ...an initial state
      const state = INITIAL_STATE

      // when ... we add new challenges
      const challenges = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Challenge 1',
          id2: 'Challenge 1',
          id3: 'Challenge 1',
        },
      }
      // @ts-ignore
      const action = setChallenges(challenges)
      const result = SUT(state, action)

      // then ... we state should be the new challenges
      expect(result).toEqual(challenges)
    })
  })
})
