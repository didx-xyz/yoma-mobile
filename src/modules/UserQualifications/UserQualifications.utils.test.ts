import { mergeDeepRight } from 'ramda'

import { USER_QUALIFICATIONS_MOCK } from '~/modules/UserQualifications/UserQualifications.fixture'

import * as SUT from './UserQualifications.utils'

describe('modules/UserQualifications/UserQualifications.utils', () => {
  describe('getUserQualificationsMetadata', () => {
    it('should return the required metadata from a User Qualification Credential', () => {
      const result = SUT.getUserQualificationsMetadata(USER_QUALIFICATIONS_MOCK[0])

      expect(result).toStrictEqual(['Apr 2021'])
    })
    it('should correctly handle if a property is empty', () => {
      const result = SUT.getUserQualificationsMetadata(
        mergeDeepRight(USER_QUALIFICATIONS_MOCK[0], { endDate: undefined }),
      )
      expect(result.length).toBe(0)
      expect(result).toStrictEqual([])
    })
  })
  describe('getEducationOrCourse', () => {
    it.each([
      [false, { qualification: { createdByAdmin: true } }, true],
      [false, { qualification: { createdByAdmin: false } }, false],
      [true, { qualification: { createdByAdmin: true } }, false],
      [true, { qualification: { createdByAdmin: false } }, true],
    ])(
      'should return the required metadata from a User Qualification Credential',
      (isEducation, qualification, expected) => {
        const result = SUT.filterEducationOrCourse(isEducation)(qualification)

        expect(result).toBe(expected)
      },
    )
  })
})
