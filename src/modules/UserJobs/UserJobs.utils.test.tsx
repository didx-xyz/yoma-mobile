import { USER_JOBS_MOCK } from '~/modules/UserJobs/UserJobs.fixture'

import * as SUT from './UserJobs.utils'

describe('modules/UserJobs/UserJobs.utils', () => {
  describe('extractUserJobFromData', () => {
    it('should return UserJobs from payload', () => {
      //given ...
      const mockResponse = USER_JOBS_MOCK[0]

      //when .. extractUserJobFromData
      const result = SUT.extractUserJobFromData(mockResponse)

      //then result should equal job request payload data
      expect(result).toEqual(USER_JOBS_MOCK)
    })
  })
})
