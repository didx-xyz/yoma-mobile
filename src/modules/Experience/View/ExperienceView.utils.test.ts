import { mergeDeepRight } from 'ramda'

import { USER_WORK_EXPERIENCE_MOCK } from '~/modules/UserWorkExperience/UserWorkExperience.fixture'

import * as SUT from './ExperienceView.utils'

describe('modules/WorkExperience/WorkExperience.utils', () => {
  describe('getExperienceMetadata', () => {
    it('should return the required metadata from a User Job Credential', () => {
      const result = SUT.getExperienceMetadata(USER_WORK_EXPERIENCE_MOCK[0])

      expect(result).toStrictEqual(['NAME', 'Jun 2021 - Aug 2021 • 2 months', 'COUNTRY'])
    })
    it('should correctly handle if a property is empty', () => {
      const result = SUT.getExperienceMetadata(
        mergeDeepRight(USER_WORK_EXPERIENCE_MOCK[0], { opportunity: { countries: undefined } }),
      )
      expect(result.length).toBe(2)
      expect(result).toStrictEqual(['NAME', 'Jun 2021 - Aug 2021 • 2 months'])
    })
  })
})
