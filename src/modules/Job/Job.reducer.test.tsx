import { rootStateFixture } from 'redux/redux.test.fixtures'

import SUT, { clearJobs, INITIAL_STATE, setTmpFormValues } from './Job.reducer'
import { jobCredentialsStateData } from './Job.test.fixtures'

describe('modules/Jobs/Jobs.reducer', () => {
  describe('setTmpFormValues', () => {
    it('should set jobs form values for credentials correctly', () => {
      // given ....
      const mockFormValues = {
        startTime: 'START_TIME',
        endTime: 'END_TIME',
      }

      const mockState = rootStateFixture()
      // when ... we set the setTmpFormValues
      const action = setTmpFormValues(mockFormValues)
      const result = SUT(mockState, action)
      // then ... validate tmpFormValues
      expect(result.tmpFormValues).toEqual({
        startTime: 'START_TIME',
        endTime: 'END_TIME',
      })
    })
  })
  describe('clearJobs', () => {
    it('should clear jobs state', () => {
      // give ... jobs in state
      const mockState = rootStateFixture({
        job: {
          jobEntities: jobCredentialsStateData,
        },
      })
      //when we clearJobs
      const action = clearJobs()
      const result = SUT(mockState, action)
      // then ... should set the default Jobs state
      expect(result).toEqual(INITIAL_STATE)
    })
  })
})
