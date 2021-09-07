import { mergeDeepRight } from 'ramda'

import { USER_QUALIFICATIONS_MOCK } from '../UserQualifications/UserQualifications.fixture'
import * as SUT from './Education.util'

describe('modules/Education/Education.utils', () => {
  describe('getEducationMetadata', () => {
    it('should return the required metadata from a User Qualification Credential', () => {
      const result = SUT.getEducationMetadata(USER_QUALIFICATIONS_MOCK[0])

      expect(result).toStrictEqual(['Apr 2021'])
    })
    it('should correctly handle if a property is empty', () => {
      const result = SUT.getEducationMetadata(mergeDeepRight(USER_QUALIFICATIONS_MOCK[0], { endDate: undefined }))
      expect(result.length).toBe(0)
      expect(result).toStrictEqual([])
    })
  })
})
