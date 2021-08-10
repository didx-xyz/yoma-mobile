import { rootStateFixture } from 'redux/redux.test.fixtures'
import { normalise } from 'utils/redux.utils'

import SUT, { clearUserJobs, INITIAL_STATE, setTmpFormValues, setUserJobsEntities } from './UserJobs.reducer'
import { jobCredentialsStateData } from './UserJobs.test.fixtures'

describe('modules/UserJobs/UserJobs.reducer', () => {
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
  describe('setUserJobsEntities', () => {
    it('should set normalised job entities from job credentials payload', () => {
      // given ....
      const normalisedPayload = normalise({
        id: 'id1',
        other: 'DATA',
      })

      const mockState = rootStateFixture()
      // when ... we set the setUserJobsEntities
      const action = setUserJobsEntities(normalisedPayload)
      const result = SUT(mockState, action)
      // then ... validate setUserJobsEntities
      expect(result.jobEntities).toEqual({
        entities: {
          id1: {
            id: 'id1',
            other: 'DATA',
          },
        },
        ids: ['id1'],
      })
    })
  })
  describe('clearUserJobs', () => {
    it('should clear jobs state', () => {
      // give ... jobs in state
      const mockState = rootStateFixture({
        job: {
          jobEntities: jobCredentialsStateData,
        },
      })
      //when we clearUserJobs
      const action = clearUserJobs()
      const result = SUT(mockState, action)
      // then ... should set the default UserJobs state
      expect(result).toEqual(INITIAL_STATE)
    })
  })
})
