import { rootStateFixture } from '../../redux/redux.fixture'
import { USER_CHALLENGES_STATE_MOCK } from './UserChallenges.fixtures'
import { INITIAL_STATE } from './UserChallenges.reducer'
import * as SUT from './UserChallenges.selector'

describe('modules/CompletedChallenges/CompletedChallenges.selector', () => {
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
      const state = rootStateFixture({ userChallenges: USER_CHALLENGES_STATE_MOCK })
      // when ...
      const result = SUT.selectUserChallenges(state)
      // then ...
      expect(result).toEqual(USER_CHALLENGES_STATE_MOCK)
    })
  })
  describe('selectFormCertificate', function () {
    it('should correctly handle an empty state', () => {
      // given ...
      const state = rootStateFixture()
      // when ...
      const result = SUT.selectFormCertificate(state)
      // then ...
      expect(result).toEqual(null)
    })
    it('should return the uri in formValues should it exist', () => {
      // given ...
      const state = rootStateFixture({
        userChallenges: {
          ...USER_CHALLENGES_STATE_MOCK,
          formValues: {
            certificate: 'FILE DATA OBJECT',
          },
        },
      })
      // when ...
      const result = SUT.selectFormCertificate(state)
      // then ...
      expect(result).toEqual('FILE DATA OBJECT')
    })
  })
})
