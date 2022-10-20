import { rootStateFixture } from '~/redux/redux.fixture'

import SUT, { INITIAL_STATE, clearWorkExperiences, setWorkExperience } from './WorkExperience.reducer'
import { WORK_EXPERIENCE_MOCK } from './WorkExperience.test.fixtures'

describe('modules/WorkExperience/WorkExperience.reducer', () => {
  describe('setWorkExperience', () => {
    it('should set job data from payload', () => {
      // given ....
      const mockState = rootStateFixture()
      // when ... we set the setWorkExperience
      const action = setWorkExperience(WORK_EXPERIENCE_MOCK)
      const result = SUT(mockState, action)

      // then ... validate setWorkExperience
      expect(result).toEqual(WORK_EXPERIENCE_MOCK)
    })
  })
  describe('clearWorkExperience', () => {
    it('should clear job state', () => {
      // give ... workExperience in state
      const mockState = rootStateFixture({
        jobs: WORK_EXPERIENCE_MOCK,
      })
      //when we clearWorkExperiences
      const action = clearWorkExperiences()
      const result = SUT(mockState, action)

      // then ... should set the default Work Experiences state
      expect(result).toEqual(INITIAL_STATE)
    })
  })
})
