import { rootStateFixture } from '../../redux/redux.test.fixtures'
import { INITIAL_STATE } from './UserChallenges.reducer'
import * as SUT from './UserChallenges.selector'
import { USER_CHALLENGES_MOCK } from './UserChallenges.test.fixtures'

describe('modules/UserChallenges/UserChallenges.selector', () => {
  describe('selectUserChallenges', function () {
    it('should correctly handle an empty state', () => {
      // given ...
      const state = rootStateFixture()
      // when ...
      const result = SUT.selectUserChallenges(state)
      // then ...
      expect(result).toEqual(INITIAL_STATE)
    })
    it('should return all the user challenges data', () => {
      // given ...
      const state = rootStateFixture({ userChallenges: USER_CHALLENGES_MOCK })
      // when ...
      const result = SUT.selectUserChallenges(state)
      // then ...
      expect(result).toEqual(USER_CHALLENGES_MOCK)
    })
  })
})