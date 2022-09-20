import { mergeDeepRight } from 'ramda'

import { USER_JOBS_MOCK } from '~/modules/UserJobs/UserJobs.fixture'

import * as SUT from './ExperienceView.utils'

describe('modules/Experience/Experience.utils', () => {
  describe('getExperienceMetadata', () => {
    it('should return the required metadata from a User Job Credential', () => {
      const result = SUT.getExperienceMetadata(USER_JOBS_MOCK[0])

      expect(result).toStrictEqual(['NAME', 'Jun 2021 - Aug 2021 • 2 months', 'COUNTRY'])
    })
    it('should correctly handle if a property is empty', () => {
      const result = SUT.getExperienceMetadata(
        mergeDeepRight(USER_JOBS_MOCK[0], { opportunity: { countries: undefined } }),
      )
      expect(result.length).toBe(2)
      expect(result).toStrictEqual(['NAME', 'Jun 2021 - Aug 2021 • 2 months'])
    })
  })
})
