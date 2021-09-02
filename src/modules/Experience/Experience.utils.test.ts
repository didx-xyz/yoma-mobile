import { USER_JOBS_MOCK } from '../UserJobs/UserJobs.test.fixtures'
import * as SUT from './Experience.utils'

describe('modules/Experience/Experience.utils', () => {
  describe('extractUserJobsFormValues', () => {
    it('should return UserJobs form values from job credential payload', () => {
      //given ...
      //when .. extractUserJobsFormValues
      const result = SUT.extractUserJobsFormValues(USER_JOBS_MOCK[0])

      //then result should equal job request payload data
      expect(result).toEqual({
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        title: 'TITLE',
        description: 'DESCRIPTION',
        skillNames: ['SKILL'],
        organisationId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        startTime: '2021-06-02T10:32:47.330Z',
        endTime: '2021-08-02T10:32:47.330Z',
      })
    })
  })
})
