import { rootStateFixture } from '~/redux/redux.fixture'

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
  describe('selectUserChallengeEntities', function () {
    it('should correctly handle an empty state', () => {
      // given ...
      const state = rootStateFixture()
      // when ...
      const result = SUT.selectUserChallengeEntities(state)
      // then ...
      expect(result).toEqual({})
    })
    it('should return the entities object', () => {
      // given ...
      const state = rootStateFixture({
        userChallenges: {
          ids: ['challenge1', 'challenge2', 'challenge3'],
          entities: {
            challenge1: 'USER CREDENTIAL DATA',
            challenge2: 'USER CREDENTIAL DATA',
            challenge3: 'USER CREDENTIAL DATA',
          },
        },
      })
      // when ...
      const result = SUT.selectUserChallengeEntities(state)
      // then ...
      expect(result).toEqual({
        challenge1: 'USER CREDENTIAL DATA',
        challenge2: 'USER CREDENTIAL DATA',
        challenge3: 'USER CREDENTIAL DATA',
      })
    })
  })
  describe('selectFormCertificate', function () {
    it('should correctly handle an empty state', () => {
      // given ...
      const state = rootStateFixture()
      // when ...
      const result = SUT.selectFormCertificate(state)
      // then ...
      expect(result).toBe(null)
    })
    it('should return the certificate in formValues should it exist', () => {
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
      expect(result).toBe('FILE DATA OBJECT')
    })
  })
})
