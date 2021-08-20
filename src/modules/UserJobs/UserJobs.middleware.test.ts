import { UserCredentialTypes } from 'api/users/users.types'
import { JOB_MOCK } from 'modules/Jobs/Jobs.test.fixtures'
import { mergeRight } from 'ramda'

import { createMiddlewareStub } from '../../../tests/tests.utils'
import { actions as ApiActions, utils as ApiUtils } from '../../api'
import { constants as ApiUsersConstants } from '../../api/users'
import * as UserActions from '../User/User.reducer'
import * as SUT from './UserJobs.middleware'
import {
  createUserJob,
  createUserJobsFailure,
  createUserJobsSuccess,
  getUserJobsSuccess,
  normaliseUserJobsSuccess,
  setUserJobs,
  updateNormalisedUserJobs,
} from './UserJobs.reducer'
import { USER_JOBS_MOCK, USER_JOBS_NORMALISED_MOCK } from './UserJobs.test.fixtures'

describe('modules/UserJobs/UserJobs.middleware', () => {
  describe('getUserJobsFromCredentialsFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const credentialsResponseMock = ['job1', 'job1', 'assignment1', 'job2']
      const extractDataFromPayloadMock = jest.fn()
      const extractJobsMock = jest.fn()
      const action = UserActions.fetchUserCredentialsSuccess(credentialsResponseMock)

      // when ...
      const { invoke, next } = create(SUT.getUserJobsFromCredentialsFlow(extractDataFromPayloadMock, extractJobsMock))
      invoke(action)

      // then ...
      expect(extractJobsMock).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    it(' should intercept the credentials data and pass on the correct jobs data', () => {
      // given ...credential data in an action payload
      const create = createMiddlewareStub(jest)
      const credentialsResponseMock = ['job1', 'job1', 'assignment1', 'job2']
      const jobCredentialsMock = ['job1', 'job2']
      const action = UserActions.fetchUserCredentialsSuccess(credentialsResponseMock)

      // when ... we intercept the data and extract jobs
      const extractDataFromPayloadMock = jest.fn()
      const extractJobsMock = jest.fn(() => jobCredentialsMock)
      const { invoke, store } = create(
        // @ts-ignore - actual shape of data doesn't matter
        SUT.getUserJobsFromCredentialsFlow(extractDataFromPayloadMock, extractJobsMock),
      )
      invoke(action)

      // then ... we should pass on the extracted data
      expect(extractJobsMock).toHaveBeenCalled()
      // @ts-ignore - actual shape of data doesn't matter
      expect(store.dispatch).toHaveBeenCalledWith(getUserJobsSuccess(jobCredentialsMock))
    })
  })
  describe('normaliseUserJobsFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const jobCredentialsMock = [{ id1: 'job1' }, { id2: 'job2' }]
      const normalisedJobsMock = {
        ids: ['id1', 'id2'],
        entries: { id1: 'job 1', id2: 'job 2' },
      }
      const normaliseMock = jest.fn(() => normalisedJobsMock)
      // @ts-ignore - data shape doesn't matter for test
      const action = getUserJobsSuccess(jobCredentialsMock)

      // when ...
      // @ts-ignore - data shape doesn't matter for test
      const { invoke, store, next } = create(SUT.normaliseUserJobsFlow(normaliseMock))
      invoke(action)

      // then ...
      expect(store.dispatch).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should normalise and forward the job credentials', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const jobCredentialsMock = [{ id1: 'job1' }, { id2: 'job2' }]
      const normalisedJobsMock = {
        ids: ['id1', 'id2'],
        entries: { id1: 'job 1', id2: 'job 2' },
      }
      const normaliseMock = jest.fn(() => normalisedJobsMock)
      // @ts-ignore - data shape doesn't matter for test
      const action = getUserJobsSuccess(jobCredentialsMock)

      // when ...
      // @ts-ignore - data shape doesn't matter for test
      const { invoke, store } = create(SUT.normaliseUserJobsFlow(normaliseMock))
      invoke(action)

      // then ...
      // @ts-ignore - data shape doesn't matter for test
      expect(store.dispatch).toHaveBeenCalledWith(normaliseUserJobsSuccess(normalisedJobsMock))
    })
  })
  describe('setUserJobsFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)

      const normalisedJobsMock = 'NORMALISED JOBS DATA'
      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      const action = normaliseUserJobsSuccess(normalisedJobsMock)

      // when ...
      const { invoke, store, next } = create(SUT.setUserJobsFlow)
      invoke(action)

      // then ...
      expect(store.dispatch).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should set the normalised job data', () => {
      // given ...
      const create = createMiddlewareStub(jest)

      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      const action = normaliseUserJobsSuccess('NORMALISED JOBS DATA')

      // when ... we have jobs data to store in state
      const { invoke, store } = create(SUT.setUserJobsFlow)
      invoke(action)

      // then ...we want to forward it with our reducer action
      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      expect(store.dispatch).toHaveBeenCalledWith(setUserJobs('NORMALISED JOBS DATA'))
    })
  })
  describe('createUserJobsFlow', () => {
    it('should correctly handle being called', () => {
      // given ... a user object with an id in state
      const userId = 'A USER ID'

      const mockFormValues = {
        type: UserCredentialTypes.Job,
        startTime: 'START_TIME',
        endTime: 'END_TIME',
        requestVerification: false,
      }

      const create = createMiddlewareStub(jest, { user: { id: userId }, userJobs: { formValues: mockFormValues } })
      // when ... we create the user's credentials
      const action = createUserJob(JOB_MOCK)
      // @ts-ignore
      const { store, invoke, next } = create(SUT.createUserJobsFlow)
      invoke(action)

      // then ...
      // ... we should ensure the action continues onto next
      const userJobsPayload = {
        ...mockFormValues,
        credentialItemId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      }
      const config = ApiUtils.prependIdToEndpointInConfig(ApiUsersConstants.USERS_CREDENTIALS_CREATE_CONFIG)(userId)

      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: createUserJobsSuccess,
            onFailure: createUserJobsFailure,
          }),
          userJobsPayload,
        ),
      )
    })
  })
  describe('createUserJobsSuccessFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const mockNotification = jest.fn()
      const mockResponse = {
        data: { data: USER_JOBS_MOCK[0] },
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }

      const action = createUserJobsSuccess(mockResponse)
      // @ts-ignore
      const { store, invoke, next } = create(SUT.createUserJobsSuccessFlow({ notification: mockNotification }))
      // when ... we respond to the createUserJobsSuccess action
      invoke(action)

      // then ...validate createUserJobsSuccessFlow
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalledWith(updateNormalisedUserJobs(USER_JOBS_NORMALISED_MOCK))
    })
  })
  describe('createUserJobsFailureFlow', () => {
    it('should correctly handle job credentials create failure', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const action = createUserJobsFailure('FAILED')
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.createUserJobsFailureFlow({ notification: mockNotification }))

      // when ... we respond to the createUserJobsFailures action
      invoke(action)

      // then ...validate failure
      expect(mockNotification).toHaveBeenCalled()
    })
  })
})
