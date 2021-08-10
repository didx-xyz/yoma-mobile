import { rootStateFixture } from 'redux/redux.test.fixtures'

import * as SUT from './UserJobs.selector'
import { jobCredentialsStateData } from './UserJobs.test.fixtures'

describe('modules/UserJobs/UserJobs.selector', () => {
  describe('selectUserJobs ', () => {
    it('should return job property of the root state', () => {
      const jobStateMock = {
        tmpFormValues: {},
        jobEntities: jobCredentialsStateData,
      }

      const mockState = rootStateFixture({
        job: jobStateMock,
      })
      // when ... we call the selector
      const result = SUT.selectUserJobs(mockState)

      // then ... should return result as expected
      expect(result).toEqual(jobStateMock)
    })
    it('should return the default jobs state', () => {
      const state = rootStateFixture()
      // when ... we call the selector
      const result = SUT.selectUserJobs(state)
      // then ... should return result as expected
      expect(result).toEqual(state.job)
    })
  })
  describe('selectUserJobsTmpFormValues ', () => {
    it('should return tmpFormValues object from the job state', () => {
      const jobStateMock = {
        tmpFormValues: 'FORM_DATA',
        jobEntities: jobCredentialsStateData,
      }

      const mockState = rootStateFixture({
        job: jobStateMock,
      })
      // when ... we call the selector
      const result = SUT.selectUserJobsTmpFormValues(mockState)

      // then ... should return result as expected
      expect(result).toEqual('FORM_DATA')
    })
  })
  describe('selectUserJobsEntities ', () => {
    it('should return jobEntities object from the job state', () => {
      const jobStateMock = {
        tmpFormValues: 'FORM_DATA',
        jobEntities: {
          entities: {
            id1: {
              id: 'id1',
              other: 'OTHER DATA',
            },
          },
          ids: ['id1'],
        },
      }

      const mockState = rootStateFixture({
        job: jobStateMock,
      })
      // when ... we call the selector
      const result = SUT.selectUserJobsEntities(mockState)

      // then ... should return result as expected
      expect(result).toEqual({
        id1: {
          id: 'id1',
          other: 'OTHER DATA',
        },
      })
    })
  })
})
