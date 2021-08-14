import { rootStateFixture } from 'redux/redux.test.fixtures'

import SUT, { clearJob, INITIAL_STATE, setJob } from './Jobs.reducer'
import { JOB_MOCK } from './Jobs.test.fixtures'

describe('modules/Jobs/Jobs.reducer', () => {
  describe('setJob', () => {
    it('should set job data from payload', () => {
      // given ....
      const mockState = rootStateFixture()
      // when ... we set the setJob
      const action = setJob(JOB_MOCK)
      const result = SUT(mockState, action)

      // then ... validate setJob
      expect(result).toEqual(JOB_MOCK)
    })
  })
  describe('clearJob', () => {
    it('should clear job state', () => {
      // give ... jobs in state
      const mockState = rootStateFixture({
        jobs: JOB_MOCK,
      })
      //when we clearJobs
      const action = clearJob()
      const result = SUT(mockState, action)

      // then ... should set the default Jobs state
      expect(result).toEqual(INITIAL_STATE)
    })
  })
})
