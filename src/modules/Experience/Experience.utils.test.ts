import { pick } from 'ramda'

import { USER_JOBS_MOCK } from '../UserJobs/UserJobs.test.fixtures'
import * as SUT from './Experience.utils'

describe('modules/Experience/Experience.utils', () => {
  describe('formatStartEndDatesWithDuration', () => {
    it('should return the date period as well as the interval length', () => {
      const durationTimestamps = pick(['startDate', 'endDate'])(USER_JOBS_MOCK[0])

      const result = SUT.formatDurationString(durationTimestamps)

      expect(result).toBe('Jun 2021 - Aug 2021 • 2 months')
    })
  })
  describe('getExperienceMetadata', () => {
    it('should return the required metadata from a User Job Credential', () => {
      const result = SUT.getExperienceMetadata(USER_JOBS_MOCK[0])

      expect(result).toStrictEqual(['NAME', 'Jun 2021 - Aug 2021 • 2 months', 'COUNTRY'])
    })
  })
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
