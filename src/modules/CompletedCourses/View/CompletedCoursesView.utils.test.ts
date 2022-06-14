import { mergeDeepRight } from 'ramda'

import { USER_QUALIFICATIONS_MOCK } from '~/modules/UserQualifications/UserQualifications.fixture'

import * as SUT from './CompletedCoursesView.utils'

describe('modules/CompletedCoursesView/CompletedCoursesView.utils', () => {
  describe('getCompletedCoursesMetadata', () => {
    it('should return the required metadata from a User Qualification Credential', () => {
      const result = SUT.getCompletedCoursesMetadata(USER_QUALIFICATIONS_MOCK[0])

      expect(result).toStrictEqual(['Apr 2021'])
    })
    it('should correctly handle if a property is empty', () => {
      const result = SUT.getCompletedCoursesMetadata(
        mergeDeepRight(USER_QUALIFICATIONS_MOCK[0], { endDate: undefined }),
      )
      expect(result.length).toBe(0)
      expect(result).toStrictEqual([])
    })
  })
})
