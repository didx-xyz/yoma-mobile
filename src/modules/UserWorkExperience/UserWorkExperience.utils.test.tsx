import { USER_WORK_EXPERIENCE_MOCK } from './UserWorkExperience.fixture'
import * as SUT from './UserWorkExperience.utils'

describe('modules/UserWorkExperience/UserWorkExperience.utils', () => {
  describe('extractUserWorkExperienceFromData', () => {
    it('should return UserWorkExperience from payload', () => {
      //given ...
      const mockResponse = USER_WORK_EXPERIENCE_MOCK[0]

      //when .. extractUserJobFromData
      const result = SUT.extractUserWorkExperienceFromData(mockResponse)

      //then result should equal job request payload data
      expect(result).toEqual(USER_WORK_EXPERIENCE_MOCK)
    })
  })
})
