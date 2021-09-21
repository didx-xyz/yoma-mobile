import { mergeDeepRight } from 'ramda'

import { USER_CHALLENGES_RESPONSE_MOCK } from '../../UserChallenges/UserChallenges.fixtures'
import * as SUT from './CompletedChallengesView.utils'

describe('modules/CompletedChallenges/CompletedChallengesView/CompletedChallengesView.utils', () => {
  describe('getCompletedChallengesMetadata', () => {
    it('should return the required metadata from a User Qualification Credential', () => {
      const result = SUT.getCompletedChallengesMetadata(USER_CHALLENGES_RESPONSE_MOCK[0])

      expect(result).toStrictEqual(['IDDQD', 'Jun 2021 - Sep 2021'])
    })
    it('should correctly handle if a property is empty', () => {
      const result = SUT.getCompletedChallengesMetadata(
        mergeDeepRight(USER_CHALLENGES_RESPONSE_MOCK[0], { challenge: { organisationName: undefined } }),
      )
      expect(result.length).toBe(1)
      expect(result).toStrictEqual(['Jun 2021 - Sep 2021'])
    })
  })
})
