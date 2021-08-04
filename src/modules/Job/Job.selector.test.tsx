import { rootStateFixture } from 'redux/redux.test.fixtures'

import * as SUT from './Job.selector'
import { jobCredentialsStateData } from './Job.test.fixtures'

describe('modules/Jobs/Jobs.selector', () => {
  describe('selectJob ', () => {
    it('should return job property of the root state', () => {
      const jobStateMock = {
        tmpFormValues: {},
        jobEntities: jobCredentialsStateData,
      }

      const mockState = rootStateFixture({
        job: jobStateMock,
      })
      // when ... we call the selector
      const result = SUT.selectJob(mockState)

      // then ... should return result as expected
      expect(result).toEqual(jobStateMock)
    })
    it('should return the default jobs state', () => {
      const state = rootStateFixture()
      // when ... we call the selector
      const result = SUT.selectJob(state)
      // then ... should return result as expected
      expect(result).toEqual(state.job)
    })
  })
  describe('selectJobTmpFormValues ', () => {
    it('should return tmpFormValues object from the job state', () => {
      const jobStateMock = {
        tmpFormValues: 'FORM_DATA',
        jobEntities: jobCredentialsStateData,
      }

      const mockState = rootStateFixture({
        job: jobStateMock,
      })
      // when ... we call the selector
      const result = SUT.selectJobTmpFormValues(mockState)

      // then ... should return result as expected
      expect(result).toEqual('FORM_DATA')
    })
  })
  describe('selectJobEntities ', () => {
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
      const result = SUT.selectJobEntities(mockState)

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
