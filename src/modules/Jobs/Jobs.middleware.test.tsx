import { mergeRight } from 'ramda'

import { createMiddlewareStub } from '../../../tests/tests.utils'
import { actions as ApiActions } from '../../api'
import { constants as ApiJobsConstants } from '../../api/jobs'
import * as SUT from './Jobs.middleware'
import { createJob, createJobFailure, createJobSuccess, setJob } from './Jobs.reducer'
import { JOB_MOCK } from './Jobs.test.fixtures'

describe('modules/Jobs/Jobs.middleware', () => {
  describe('createJobFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const mockPayload = {
        title: 'TITLE',
        description: 'DESCRIPTION',
        organisationId: 'ORGANISATION_ID',
        language: 'EN',
        published: true,
        skillNames: ['SKILL 1'],
        countries: ['COUNTRY 1'],
        startTime: '2021-08-02T13:24:27.839Z',
        endTime: '2021-09-02T13:02:27.839Z',
      }
      // when ... we create the user's credentials
      const action = createJob(mockPayload)
      // @ts-ignore
      const { store, invoke, next } = create(SUT.createJobFlow)
      invoke(action)

      // then ...
      // ... we should ensure the action continues onto next
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(ApiJobsConstants.JOBS_CREATE_CONFIG, {
            onSuccess: createJobSuccess,
            onFailure: createJobFailure,
          }),
          action.payload,
        ),
      )
    })
  })
  describe('createJobSuccessFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const mockNotification = jest.fn()
      const mockedPayload = {
        data: {
          data: JOB_MOCK,
        },
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }
      const action = createJobSuccess(mockedPayload)
      // @ts-ignore
      const { invoke, next } = create(SUT.createJobSuccessFlow({ notification: mockNotification }))
      // when ... we respond to the createJobSuccess action
      invoke(action)

      // then ...validate createJobSuccessFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly handle job create success', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const mockNotification = jest.fn()

      const mockedPayload = {
        data: {
          data: JOB_MOCK,
        },
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }

      const action = createJobSuccess(mockedPayload)
      // @ts-ignore
      const { store, invoke } = create(SUT.createJobSuccessFlow({ notification: mockNotification }))
      // when ... we respond to the createJobSuccess action
      invoke(action)

      // then ...validate createJobSuccessFlow
      expect(store.dispatch).toHaveBeenCalledWith(setJob(JOB_MOCK))
    })
  })
  describe('createJobFailureFlow', () => {
    it('should correctly handle job create failure', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const action = createJobFailure('FAILED')
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.createJobFailureFlow({ notification: mockNotification }))

      // when ... we respond to the createJobFailures action
      invoke(action)

      // then ...validate failure
      expect(mockNotification).toHaveBeenCalled()
    })
  })
})
