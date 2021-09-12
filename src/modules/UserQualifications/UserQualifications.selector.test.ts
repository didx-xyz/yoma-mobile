import { rootStateFixture } from '../../redux/redux.fixture'
import { USER_QUALIFICATIONS_MOCK } from './UserQualifications.fixture'
import { INITIAL_STATE } from './UserQualifications.reducer'
import * as SUT from './UserQualifications.selector'

describe('modules/CompletedChallenges/CompletedChallenges.selector', () => {
  describe('selectUserQualifications', function () {
    it('should correctly handle an empty state', () => {
      // given ...
      const state = rootStateFixture()
      // when ...
      const result = SUT.selectUserQualifications(state)
      // then ...
      expect(result).toEqual(INITIAL_STATE)
    })
    it('should return all the user qualifications data', () => {
      // given ...
      const state = rootStateFixture({ userQualifications: USER_QUALIFICATIONS_MOCK })
      // when ...
      const result = SUT.selectUserQualifications(state)
      // then ...
      expect(result).toEqual(USER_QUALIFICATIONS_MOCK)
    })
  })
})
