import { mergeDeepRight } from 'ramda'

import { USER_QUALIFICATIONS_MOCK } from './UserEducation.fixture'
import * as SUT from './UserEducation.utils'

describe('modules/UserEducation/UserEducation.utils', () => {
  describe('getUserEducationMetadata', () => {
    it('should return the required metadata from a User Qualification Credential', () => {
      const result = SUT.getUserEducationMetadata(USER_QUALIFICATIONS_MOCK[0])

      expect(result).toStrictEqual(['Apr 2021'])
    })
    it('should correctly handle if a property is empty', () => {
      const result = SUT.getUserEducationMetadata(mergeDeepRight(USER_QUALIFICATIONS_MOCK[0], { endDate: undefined }))
      expect(result.length).toBe(0)
      expect(result).toStrictEqual([])
    })
  })
  describe('getEducationOrCourse', () => {
    it.each([
      [false, { opportunity: { createdByAdmin: true } }, true],
      [false, { opportunity: { createdByAdmin: false } }, false],
      [true, { opportunity: { createdByAdmin: true } }, false],
      [true, { opportunity: { createdByAdmin: false } }, true],
    ])(
      'should return the required metadata from a User Qualification Credential',
      (isEducation, qualification, expected) => {
        const result = SUT.filterEducationOrCourse(isEducation)(qualification)

        expect(result).toBe(expected)
      },
    )
  })
})
