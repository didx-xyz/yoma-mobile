import { UserCredentialTypes } from 'api/users/users.types'
import { JOB_MOCK } from 'modules/Jobs/Jobs.test.fixtures'
import { mergeRight } from 'ramda'

import { createMiddlewareStub } from '../../../tests/tests.utils'
import { actions as ApiActions, utils as ApiUtils } from '../../api'
import { constants as ApiUsersConstants } from '../../api/users'
import { createJob } from '../Jobs/Jobs.reducer'
import * as UserActions from '../User/User.reducer'
import * as SUT from './UserJobs.middleware'
import {
  createUserJob,
  createUserJobFailure,
  createUserJobSuccess,
  fetchUserJobById,
  fetchUserJobByIdFailure,
  fetchUserJobByIdSuccess,
  getUserJobsSuccess,
  normaliseUserJobsSuccess,
  setUserJobs,
  setUserJobsFormValues,
  updateUserJobs,
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
  describe('setUserJobsFormValuesFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)

      const formDataMock = 'Form Data'
      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      const action = createJob(formDataMock)

      // when ...
      const { invoke, store, next } = create(SUT.setUserJobsFormValuesFlow)
      invoke(action)

      // then ...
      expect(store.dispatch).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should set the job form data', () => {
      // given ...
      const create = createMiddlewareStub(jest)

      const formDataMock = {
        title: 'TITLE',
        description: 'DESCRIPTION',
        language: 'LANGUAGE',
        published: 'PUBLISHED',
        skillNames: 'SKILL_NAMES',
        organisationId: 'ORGANISATION_ID',
        startTime: 'START_TIME',
        endTime: 'END_TIME',
      }
      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      const action = createJob(formDataMock)

      // when ...
      const { invoke, store } = create(SUT.setUserJobsFormValuesFlow)
      invoke(action)

      // then ...we want to forward it with our reducer action
      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      expect(store.dispatch).toHaveBeenCalledWith(
        setUserJobsFormValues({
          formValues: {
            type: UserCredentialTypes.Job,
            startTime: 'START_TIME',
            endTime: 'END_TIME',
            requestVerification: false,
          },
        }),
      )
    })
  })
  describe('createUserJobFlow', () => {
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

      const { store, invoke, next } = create(SUT.createUserJobFlow)
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
            onSuccess: createUserJobSuccess,
            onFailure: createUserJobFailure,
          }),
          userJobsPayload,
        ),
      )
    })
  })
  describe('createUserJobSuccessFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const mockResponse = {
        data: { data: USER_JOBS_MOCK[0] }, //using actual data for reference
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }

      const action = createUserJobSuccess(mockResponse)

      const { store, invoke, next } = create(SUT.createUserJobSuccessFlow)
      // when ... we respond to the createUserJobSuccess action
      invoke(action)

      // then ...validate createUserJobSuccessFlow
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalledWith(fetchUserJobById('11111-5717-4562-b3fc-2c963f66afa6'))
    })
  })
  describe('createUserJobFailureFlow', () => {
    it('should correctly handle job credentials create failure', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const action = createUserJobFailure('FAILED')
      const mockNotification = jest.fn()

      const { invoke } = create(SUT.createUserJobFailureFlow({ notification: mockNotification }))

      // when ... we respond to the createUserJobFailures action
      invoke(action)

      // then ...validate failure
      expect(mockNotification).toHaveBeenCalled()
    })
  })

  describe('fetchUserJobByIdFlow', () => {
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
      const action = fetchUserJobById('ID')

      const { store, invoke, next } = create(SUT.fetchUserJobByIdFlow)
      invoke(action)

      // then ...
      // ... we should ensure the action continues onto next
      const config = ApiUtils.prependIdToEndpointInConfig(ApiUsersConstants.USERS_CREDENTIALS_GET_BY_TYPE_CONFIG)(
        userId,
      )
      const configWithCredentialId = ApiUtils.appendIdToEndpointInConfig(config)(action.payload)
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(configWithCredentialId, {
            onSuccess: fetchUserJobByIdSuccess,
            onFailure: fetchUserJobByIdFailure,
          }),
        ),
      )
    })
  })
  describe('fetchUserJobByIdSuccessFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const mockNotification = jest.fn()
      const mockResponse = {
        data: { data: USER_JOBS_MOCK[0] }, //using actual data for reference
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }

      const action = fetchUserJobByIdSuccess(mockResponse)

      const { store, invoke, next } = create(SUT.fetchUserJobByIdSuccessFlow({ notification: mockNotification }))
      // when ... we respond to the fetchUserJobByIdSuccess action
      invoke(action)

      // then ...validate fetchUserJobByIdSuccess
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalledWith(updateUserJobs(USER_JOBS_NORMALISED_MOCK))
    })
  })
  describe('fetchUserJobByIdFailureFlow', () => {
    it('should correctly handle job credentials create failure', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const action = fetchUserJobByIdFailure('FAILED')
      const mockNotification = jest.fn()

      const { invoke } = create(SUT.fetchUserJobByIdFailureFlow({ notification: mockNotification }))

      // when ... we respond to the fetchUserJobByIdFailure action
      invoke(action)

      // then ...validate failure
      expect(mockNotification).toHaveBeenCalled()
    })
  })
})
