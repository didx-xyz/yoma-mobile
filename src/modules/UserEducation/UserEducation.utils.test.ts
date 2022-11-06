import { mergeDeepRight } from 'ramda'

import { USER_EDUCATION_MOCK } from './UserEducation.fixture'
import * as SUT from './UserEducation.utils'

describe('modules/UserEducation/UserEducation.utils', () => {
  describe('getUserEducationMetadata', () => {
    it('should return the required metadata from a User Qualification Credential', () => {
      const result = SUT.getUserEducationMetadata(USER_EDUCATION_MOCK[0])

      expect(result).toStrictEqual(['Apr 2021'])
    })
    it('should correctly handle if a property is empty', () => {
      const result = SUT.getUserEducationMetadata(mergeDeepRight(USER_EDUCATION_MOCK[0], { endDate: undefined }))
      expect(result.length).toBe(0)
      expect(result).toStrictEqual([])
    })
  })
})
