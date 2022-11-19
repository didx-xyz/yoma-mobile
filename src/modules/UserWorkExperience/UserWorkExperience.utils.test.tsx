import { USER_WORK_EXPERIENCE_MOCK } from './UserWorkExperience.fixture'
import * as SUT from './UserWorkExperience.utils'

describe('modules/UserWorkExperience/UserWorkExperience.utils', () => {
  describe('getUserWorkExperienceMetadata', () => {
    it('should return UserWorkExperience from payload', () => {
      //given ...
      const mockResponse = USER_WORK_EXPERIENCE_MOCK[0]

      //when .. extractUserJobFromData
      const result = SUT.getUserWorkExperienceMetadata(mockResponse)

      //then result should equal job request payload data
      expect(result).toEqual(['NAME', 'Jun 2021 - Aug 2021'])
    })
  })
})
