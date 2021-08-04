import { UserCredentialTypes } from 'api/users/users.types'
import { mergeRight } from 'ramda'
import { rootStateFixture } from 'redux/redux.test.fixtures'

import { createMiddlewareStub } from '../../../tests/tests.utils'
import { actions as ApiActions, utils as ApiUtils } from '../../api'
import { constants as ApiJobsConstants } from '../../api/jobs'
import { constants as ApiUsersConstants } from '../../api/users'
import * as SUT from './Job.middleware'
import {
  createJob,
  createJobCredentials,
  createJobCredentialsFailure,
  createJobCredentialsSuccess,
  createJobFailure,
  createJobSuccess,
  updateJob,
  updateJobCredentials,
  updateJobCredentialsFailure,
  updateJobCredentialsSuccess,
  updateJobFailure,
  updateJobSuccess,
} from './Job.reducer'
import { selectJobTmpFormValues } from './Job.selector'
import { defaultJobsResponseData } from './Job.test.fixtures'
import { JobCredentialsTmpFormValues } from './Job.types'
import { extractJobsFromPayload, prepareJobCredentialPayload } from './Job.utils'

describe('modules/Jobs/Jobs.middleware', () => {
  describe('createJobFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const mockState = rootStateFixture({})

      const create = createMiddlewareStub(jest, mockState)
      const mockPayload = {
        title: 'TITLE',
        description: 'DESCRIPTION',
        organisationId: 'ORGANISATION_ID',
        skillNames: ['SKILL'],
        startTime: 'START_TIME',
        endTime: 'END_TIME',
        language: 'EN',
        published: false,
      }
      const action = createJob(mockPayload)
      // @ts-ignore
      const { invoke, next } = create(SUT.createJobFlow)

      // when ... we respond to the createJob action
      invoke(action)

      // then ...validate createJobFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly handle creating a job', () => {
      // given ...
      const mockState = rootStateFixture({})
      const mockPayload = {
        title: 'TITLE',
        description: 'DESCRIPTION',
        organisationId: 'ORGANISATION_ID',
        skillNames: ['SKILL'],
        startTime: 'START_TIME',
        endTime: 'END_TIME',
        language: 'EN',
        published: false,
      }
      const create = createMiddlewareStub(jest, mockState)
      const action = createJob(mockPayload)
      // @ts-ignore
      const { invoke, store } = create(SUT.createJobFlow)
      // when ... we respond to the createJobs action
      invoke(action)

      // then ...validate createJobFlow
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
      const create = createMiddlewareStub(jest, {
        job: { tmpFormValues: { startTime: 'START_TIME', endTime: 'END_TIME' } },
      })
      const mockedAction = {
        data: defaultJobsResponseData,
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }
      const action = createJobSuccess(mockedAction)
      // @ts-ignore
      const { invoke, next } = create(SUT.createJobSuccessFlow)
      // when ... we respond to the createJobSuccess action
      invoke(action)

      // then ...validate createJobSuccessFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly create jobs credentials on success', () => {
      // given ...
      const mockState = rootStateFixture({
        job: { tmpFormValues: { startTime: 'START_TIME', endTime: 'END_TIME' } },
      })
      const mockedAction = {
        data: defaultJobsResponseData,
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }
      const create = createMiddlewareStub(jest, mockState)
      const action = createJobSuccess(mockedAction)
      // @ts-ignore
      const { store, invoke } = create(SUT.createJobSuccessFlow)
      // when ... we respond to the createJobSuccessFlow action
      invoke(action)
      // then ...validate createJobSuccessFlow is called

      const jobResponsePayload = extractJobsFromPayload(action)
      const tmpFormValues = selectJobTmpFormValues(mockState) as JobCredentialsTmpFormValues
      const jobCredentialRequestPayload = prepareJobCredentialPayload(tmpFormValues)(jobResponsePayload)

      expect(store.dispatch).toHaveBeenCalledWith(createJobCredentials(jobCredentialRequestPayload))
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
  describe('createJobCredentialsFlow', () => {
    it('should correctly handle being called', () => {
      // given ... a user object with an id in state
      const userId = 'A USER ID'
      const create = createMiddlewareStub(jest, { user: { id: userId } })
      const config = ApiUtils.prependIdToEndpointInConfig(ApiUsersConstants.USERS_CREDENTIALS_CREATE_CONFIG)(userId)
      const mockPayload = {
        type: UserCredentialTypes.Job,
        credentialItemId: 'CREDENTIAL_ITEM_ID',
        requestVerification: false,
        startTime: 'START_TIME',
        endTime: 'END_TIME',
      }
      // when ... we create the user's credentials
      const action = createJobCredentials(mockPayload)
      // @ts-ignore
      const { store, invoke, next } = create(SUT.createJobCredentialsFlow)
      invoke(action)

      // then ...
      // ... we should ensure the action continues onto next

      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: createJobCredentialsSuccess,
            onFailure: createJobCredentialsFailure,
          }),
          action.payload,
        ),
      )
    })
  })
  describe('createJobCredentialsSuccessFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const mockNotification = jest.fn()

      const action = createJobCredentialsSuccess('SUCCESS')
      // @ts-ignore
      const { invoke, next } = create(SUT.createJobCredentialsSuccessFlow({ notification: mockNotification }))
      // when ... we respond to the createJobCredentialsSuccess action
      invoke(action)
      // then ...validate createJobCredentialsSuccessFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly handle job credential create success', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const mockNotification = jest.fn()
      const action = createJobCredentialsSuccess('SUCCESS')
      // @ts-ignore
      const { invoke } = create(SUT.createJobCredentialsSuccessFlow({ notification: mockNotification }))
      // when ... we respond to the createJobCredentialsSuccess action
      invoke(action)
      // then ...validate createJobCredentialsSuccessFlow
      expect(mockNotification).toHaveBeenCalled()
    })
  })
  describe('createJobCredentialsFailureFlow', () => {
    it('should correctly handle job credentials create failure', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const action = createJobCredentialsFailure('FAILED')
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.createJobCredentialsFailureFlow({ notification: mockNotification }))

      // when ... we respond to the createJobCredentialsFailures action
      invoke(action)

      // then ...validate failure
      expect(mockNotification).toHaveBeenCalled()
    })
  })
  describe('updateJobFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const mockState = rootStateFixture({})

      const create = createMiddlewareStub(jest, mockState)
      const mockPayload = {
        title: 'TITLE',
        description: 'DESCRIPTION',
        organisationId: 'ORGANISATION_ID',
        skillNames: ['SKILL'],
        startTime: 'START_TIME',
        endTime: 'END_TIME',
        language: 'EN',
        published: false,
      }
      const action = updateJob(mockPayload)
      // @ts-ignore
      const { invoke, next } = create(SUT.updateJobFlow)

      // when ... we respond to the updateJob action
      invoke(action)

      // then ...validate updateJobFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly handle updating a job', () => {
      // given ...
      const mockState = rootStateFixture({})
      const mockPayload = {
        title: 'TITLE',
        description: 'DESCRIPTION',
        organisationId: 'ORGANISATION_ID',
        skillNames: ['SKILL'],
        startTime: 'START_TIME',
        endTime: 'END_TIME',
        language: 'EN',
        published: false,
      }
      const create = createMiddlewareStub(jest, mockState)
      const action = updateJob(mockPayload)
      // @ts-ignore
      const { invoke, store } = create(SUT.updateJobFlow)
      // when ... we respond to the updateJobs action
      invoke(action)

      // then ...validate updateJobFlow
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(ApiJobsConstants.JOBS_EDIT_CONFIG, {
            onSuccess: updateJobSuccess,
            onFailure: updateJobFailure,
          }),
          action.payload,
        ),
      )
    })
  })
  describe('updateJobSuccessFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest, {
        job: { tmpFormValues: { startTime: 'START_TIME', endTime: 'END_TIME' } },
      })
      const mockedAction = {
        data: defaultJobsResponseData,
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }
      const action = updateJobSuccess(mockedAction)
      // @ts-ignore
      const { invoke, next } = create(SUT.updateJobSuccessFlow)
      // when ... we respond to the updateJobSuccess action
      invoke(action)

      // then ...validate updateJobSuccessFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly create jobs credentials on success', () => {
      // given ...
      const mockState = rootStateFixture({
        job: { tmpFormValues: { startTime: 'START_TIME', endTime: 'END_TIME' } },
      })
      const mockedAction = {
        data: defaultJobsResponseData,
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }
      const create = createMiddlewareStub(jest, mockState)
      const action = updateJobSuccess(mockedAction)
      // @ts-ignore
      const { store, invoke } = create(SUT.updateJobSuccessFlow)
      // when ... we respond to the updateJobSuccessFlow action
      invoke(action)
      // then ...validate updateJobSuccessFlow is called

      const jobResponsePayload = extractJobsFromPayload(action)
      const tmpFormValues = selectJobTmpFormValues(mockState) as JobCredentialsTmpFormValues
      const jobCredentialRequestPayload = prepareJobCredentialPayload(tmpFormValues)(jobResponsePayload)

      expect(store.dispatch).toHaveBeenCalledWith(updateJobCredentials(jobCredentialRequestPayload))
    })
  })
  describe('updateJobFailureFlow', () => {
    it('should correctly handle jobs update failure', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const action = updateJobFailure('FAILED')
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.updateJobFailureFlow({ notification: mockNotification }))

      // when ... we respond to the updateJobFailures action
      invoke(action)

      // then ...validate failure
      expect(mockNotification).toHaveBeenCalled()
    })
  })
  describe('updateJobCredentialsFlow', () => {
    it('should correctly handle being called', () => {
      // given ... a user object with an id in state
      const userId = 'A USER ID'
      const create = createMiddlewareStub(jest, { user: { id: userId } })
      const config = ApiUtils.prependIdToEndpointInConfig(ApiUsersConstants.USERS_CREDENTIALS_CREATE_CONFIG)(userId)
      const mockPayload = {
        type: UserCredentialTypes.Job,
        credentialItemId: 'CREDENTIAL_ITEM_ID',
        requestVerification: false,
        startTime: 'START_TIME',
        endTime: 'END_TIME',
      }
      // when ... we create the user's credentials
      const action = updateJobCredentials(mockPayload)
      // @ts-ignore
      const { store, invoke, next } = create(SUT.updateJobCredentialsFlow)
      invoke(action)

      // then ...
      // ... we should ensure the action continues onto next

      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: updateJobCredentialsSuccess,
            onFailure: updateJobCredentialsFailure,
          }),
          action.payload,
        ),
      )
    })
  })
  describe('updateJobCredentialsSuccessFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const mockNotification = jest.fn()

      const action = updateJobCredentialsSuccess('SUCCESS')
      // @ts-ignore
      const { invoke, next } = create(SUT.updateJobCredentialsSuccessFlow({ notification: mockNotification }))
      // when ... we respond to the updateJobCredentialsSuccess action
      invoke(action)
      // then ...validate updateJobCredentialsSuccessFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly handle job credential create success', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const mockNotification = jest.fn()
      const action = updateJobCredentialsSuccess('SUCCESS')
      // @ts-ignore
      const { invoke } = create(SUT.updateJobCredentialsSuccessFlow({ notification: mockNotification }))
      // when ... we respond to the updateJobCredentialsSuccess action
      invoke(action)
      // then ...validate updateJobCredentialsSuccessFlow
      expect(mockNotification).toHaveBeenCalled()
    })
  })
  describe('updateJobCredentialsFailureFlow', () => {
    it('should correctly handle job credentials update failure', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const action = updateJobCredentialsFailure('FAILED')
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.updateJobCredentialsFailureFlow({ notification: mockNotification }))

      // when ... we respond to the updateJobCredentialsFailures action
      invoke(action)

      // then ...validate failure
      expect(mockNotification).toHaveBeenCalled()
    })
  })
})
