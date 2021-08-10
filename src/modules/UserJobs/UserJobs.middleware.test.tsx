import { extractPayloadData } from 'api/api.utils'
import { UserCredentialTypes } from 'api/users/users.types'
import { mergeRight } from 'ramda'
import { rootStateFixture } from 'redux/redux.test.fixtures'

import { createMiddlewareStub } from '../../../tests/tests.utils'
import { actions as ApiActions, utils as ApiUtils } from '../../api'
import { constants as ApiUserJobsConstants } from '../../api/jobs'
import { constants as ApiUsersConstants } from '../../api/users'
import * as SUT from './UserJobs.middleware'
import {
  createUserJobs,
  createUserJobsCredentials,
  createUserJobsCredentialsFailure,
  createUserJobsCredentialsSuccess,
  createUserJobsFailure,
  createUserJobsSuccess,
  fetchUserJobsCredentialById,
  updateUserJobs,
  updateUserJobsCredentials,
  updateUserJobsCredentialsFailure,
  updateUserJobsCredentialsSuccess,
  updateUserJobsFailure,
  updateUserJobsSuccess,
} from './UserJobs.reducer'
import { selectUserJobsCredentialIdFromTmpFormValues, selectUserJobsTmpFormValues } from './UserJobs.selector'
import { defaultUserJobsResponseData } from './UserJobs.test.fixtures'
import { UserJobsCredentialsTmpFormValues } from './UserJobs.types'
import {
  extractUserJobsCredentialId,
  extractUserJobsCredentialRequestPayload,
  extractUserJobsCredentialUpdatePayload,
} from './UserJobs.utils'

describe('modules/UserJobs/UserJobs.middleware', () => {
  describe('createUserJobsFlow', () => {
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
      const action = createUserJobs(mockPayload)
      // @ts-ignore
      const { invoke, next } = create(SUT.createUserJobsFlow)

      // when ... we respond to the createUserJobs action
      invoke(action)

      // then ...validate createUserJobsFlow
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
      const action = createUserJobs(mockPayload)
      // @ts-ignore
      const { invoke, store } = create(SUT.createUserJobsFlow)
      // when ... we respond to the createUserJobs action
      invoke(action)

      // then ...validate createUserJobsFlow
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(ApiUserJobsConstants.JOBS_CREATE_CONFIG, {
            onSuccess: createUserJobsSuccess,
            onFailure: createUserJobsFailure,
          }),
          action.payload,
        ),
      )
    })
  })
  describe('createUserJobsSuccessFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest, {
        job: { tmpFormValues: { startTime: 'START_TIME', endTime: 'END_TIME' } },
      })
      const mockedAction = {
        data: defaultUserJobsResponseData,
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }
      const action = createUserJobsSuccess(mockedAction)
      // @ts-ignore
      const { invoke, next } = create(SUT.createUserJobsSuccessFlow)
      // when ... we respond to the createUserJobsSuccess action
      invoke(action)

      // then ...validate createUserJobsSuccessFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly create jobs credentials on success', () => {
      // given ...
      const mockState = rootStateFixture({
        job: { tmpFormValues: { startTime: 'START_TIME', endTime: 'END_TIME' } },
      })
      const mockedAction = {
        data: defaultUserJobsResponseData,
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }
      const create = createMiddlewareStub(jest, mockState)
      const action = createUserJobsSuccess(mockedAction)
      // @ts-ignore
      const { store, invoke } = create(SUT.createUserJobsSuccessFlow)
      // when ... we respond to the createUserJobsSuccessFlow action
      invoke(action)
      // then ...validate createUserJobsSuccessFlow is called

      const jobResponsePayload = extractPayloadData(action)
      const tmpFormValues = selectUserJobsTmpFormValues(mockState) as UserJobsCredentialsTmpFormValues
      const jobCredentialRequestPayload = extractUserJobsCredentialRequestPayload(tmpFormValues)(jobResponsePayload)

      expect(store.dispatch).toHaveBeenCalledWith(createUserJobsCredentials(jobCredentialRequestPayload))
    })
  })
  describe('createUserJobsFailureFlow', () => {
    it('should correctly handle job create failure', () => {
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
  describe('createUserJobsCredentialsFlow', () => {
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
      const action = createUserJobsCredentials(mockPayload)
      // @ts-ignore
      const { store, invoke, next } = create(SUT.createUserJobsCredentialsFlow)
      invoke(action)

      // then ...
      // ... we should ensure the action continues onto next

      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: createUserJobsCredentialsSuccess,
            onFailure: createUserJobsCredentialsFailure,
          }),
          action.payload,
        ),
      )
    })
  })
  describe('createUserJobsCredentialsSuccessFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const mockNotification = jest.fn()

      const action = createUserJobsCredentialsSuccess('SUCCESS')
      // @ts-ignore
      const { invoke, next } = create(SUT.createUserJobsCredentialsSuccessFlow({ notification: mockNotification }))
      // when ... we respond to the createUserJobsCredentialsSuccess action
      invoke(action)
      // then ...validate createUserJobsCredentialsSuccessFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly handle job credential create success', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const mockNotification = jest.fn()
      const action = createUserJobsCredentialsSuccess('SUCCESS')
      // @ts-ignore
      const { invoke } = create(SUT.createUserJobsCredentialsSuccessFlow({ notification: mockNotification }))
      // when ... we respond to the createUserJobsCredentialsSuccess action
      invoke(action)
      // then ...validate createUserJobsCredentialsSuccessFlow
      expect(mockNotification).toHaveBeenCalled()
    })
  })
  describe('createUserJobsCredentialsFailureFlow', () => {
    it('should correctly handle job credentials create failure', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const action = createUserJobsCredentialsFailure('FAILED')
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.createUserJobsCredentialsFailureFlow({ notification: mockNotification }))

      // when ... we respond to the createUserJobsCredentialsFailures action
      invoke(action)

      // then ...validate failure
      expect(mockNotification).toHaveBeenCalled()
    })
  })
  describe('updateUserJobsFlow', () => {
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
      const action = updateUserJobs(mockPayload)
      // @ts-ignore
      const { invoke, next } = create(SUT.updateUserJobsFlow)

      // when ... we respond to the updateUserJobs action
      invoke(action)

      // then ...validate updateUserJobsFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly handle updating a job', () => {
      // given ...
      const mockPayload = {
        id: 'ID',
        title: 'TITLE',
        description: 'DESCRIPTION',
        organisationId: 'ORGANISATION_ID',
        skillNames: ['SKILL'],
        startTime: 'START_TIME',
        endTime: 'END_TIME',
        language: 'EN',
        published: false,
      }
      const create = createMiddlewareStub(jest)
      const action = updateUserJobs(mockPayload)
      // @ts-ignore
      const { invoke, store } = create(SUT.updateUserJobsFlow)
      // when ... we respond to the updateUserJobs action
      invoke(action)

      // then ...validate updateUserJobsFlow
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(ApiUserJobsConstants.JOBS_EDIT_CONFIG, {
            onSuccess: updateUserJobsSuccess,
            onFailure: updateUserJobsFailure,
            endpoint: 'ID',
          }),
          action.payload,
        ),
      )
    })
  })
  describe('fetchUserJobsCredentialByIdFlow', () => {
    it('should correctly handle being called', () => {
      // given ... a user object with an id in state
      const userId = 'A USER ID'
      const create = createMiddlewareStub(jest, { user: { id: userId } })

      // when ... we fetchUserJobsCredentialById
      const action = fetchUserJobsCredentialById('CREDENTIAL_ID')
      // @ts-ignore
      const { store, invoke, next } = create(SUT.fetchUserJobsCredentialByIdFlow)
      invoke(action)

      // then ...
      // ... we should ensure the action continues onto next
      expect(next).toHaveBeenCalledWith(action)

      // ... we should ensure the action fetchUserJobsCredentialById
      const credentialId = action.payload
      const configWithUserId = ApiUtils.prependIdToEndpointInConfig(
        ApiUsersConstants.USERS_CREDENTIALS_GET_BY_ID_CONFIG,
      )(userId)
      const config = ApiUtils.appendIdToEndpointInConfig(configWithUserId)(credentialId)
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: updateUserJobsCredentialsSuccess,
            onFailure: updateUserJobsCredentialsFailure,
          }),
        ),
      )
    })
  })
  describe('updateUserJobsSuccessFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest, {
        job: { tmpFormValues: { startTime: 'START_TIME', endTime: 'END_TIME' } },
      })
      const mockedAction = {
        data: defaultUserJobsResponseData,
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }
      const action = updateUserJobsSuccess(mockedAction)
      // @ts-ignore
      const { invoke, next } = create(SUT.updateUserJobsSuccessFlow)
      // when ... we respond to the updateUserJobsSuccess action
      invoke(action)

      // then ...validate updateUserJobsSuccessFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly create jobs credentials on success', () => {
      // given ...
      const mockState = rootStateFixture({
        job: { tmpFormValues: { startTime: 'START_TIME', endTime: 'END_TIME' } },
      })
      const mockedAction = {
        data: defaultUserJobsResponseData,
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }
      const create = createMiddlewareStub(jest, mockState)
      const action = updateUserJobsSuccess(mockedAction)
      // @ts-ignore
      const { store, invoke } = create(SUT.updateUserJobsSuccessFlow)
      // when ... we respond to the updateUserJobsSuccessFlow action
      invoke(action)
      // then ...validate updateUserJobsSuccessFlow is called
      const tmpFormValues = selectUserJobsTmpFormValues(mockState) as UserJobsCredentialsTmpFormValues
      expect(store.dispatch).toHaveBeenCalledWith(updateUserJobsCredentials(tmpFormValues))
    })
  })
  describe('updateUserJobsFailureFlow', () => {
    it('should correctly handle jobs update failure', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const action = updateUserJobsFailure('FAILED')
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.updateUserJobsFailureFlow({ notification: mockNotification }))

      // when ... we respond to the updateUserJobsFailures action
      invoke(action)

      // then ...validate failure
      expect(mockNotification).toHaveBeenCalled()
    })
  })
  describe('updateUserJobsCredentialsFlow', () => {
    it('should correctly handle being called', () => {
      // given ... a user object with an id in state
      const userId = 'A USER ID'
      const create = createMiddlewareStub(jest, { user: { id: userId } })
      const mockPayload = {
        id: 'ID',
        credentialId: 'CREDENTIAL_ID',
        startTime: 'START_TIME',
        endTime: 'END_TIME',
      }
      // when ... we updateUserJobsCredentials
      const action = updateUserJobsCredentials(mockPayload)
      // @ts-ignore
      const { store, invoke, next } = create(SUT.updateUserJobsCredentialsFlow)
      invoke(action)

      // then ...
      // ... we should ensure the action continues onto next

      const jobCredentialId = extractUserJobsCredentialId(action)
      const jobCredentialUpdatePayload = extractUserJobsCredentialUpdatePayload(action)
      const configWithUserId = ApiUtils.prependIdToEndpointInConfig(ApiUsersConstants.USERS_CREDENTIALS_EDIT_CONFIG)(
        userId,
      )
      const config = ApiUtils.appendIdToEndpointInConfig(configWithUserId)(jobCredentialId)

      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: updateUserJobsCredentialsSuccess,
            onFailure: updateUserJobsCredentialsFailure,
          }),
          jobCredentialUpdatePayload,
        ),
      )
    })
  })
  describe('updateUserJobsCredentialsSuccessFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const mockState = rootStateFixture({
        job: { tmpFormValues: { credentialId: 'CREDENTIAL_ID' } },
      })
      const create = createMiddlewareStub(jest, mockState)
      const mockNotification = jest.fn()

      const action = updateUserJobsCredentialsSuccess('SUCCESS')
      // @ts-ignore
      const { invoke, next } = create(SUT.updateUserJobsCredentialsSuccessFlow({ notification: mockNotification }))
      // when ... we respond to the updateUserJobsCredentialsSuccess action
      invoke(action)
      // then ...validate updateUserJobsCredentialsSuccessFlow
      expect(next).toHaveBeenCalledWith(action)
    })

    it('should correctly fetch job credentials after being called', () => {
      // given ...
      const mockState = rootStateFixture({
        job: {
          tmpFormValues: {
            credentialId: 'CREDENTIAL_ID',
          },
        },
      })
      const create = createMiddlewareStub(jest, mockState)
      const mockNotification = jest.fn()
      const action = updateUserJobsCredentialsSuccess('SUCCESS')
      // @ts-ignore
      const { invoke, store } = create(SUT.updateUserJobsCredentialsSuccessFlow({ notification: mockNotification }))
      // when ... we respond to the updateUserJobsCredentialsSuccess action
      invoke(action)
      // then ...validate updateUserJobsCredentialsSuccessFlow
      const jobCredentialId = selectUserJobsCredentialIdFromTmpFormValues(mockState)
      expect(store.dispatch).toHaveBeenCalledWith(fetchUserJobsCredentialById(jobCredentialId))
    })
    it('should correctly handle job credential create success', () => {
      // given ...
      const mockState = rootStateFixture({
        job: { tmpFormValues: { credentialId: 'CREDENTIAL_ID' } },
      })
      const create = createMiddlewareStub(jest, mockState)
      const mockNotification = jest.fn()
      const action = updateUserJobsCredentialsSuccess('SUCCESS')
      // @ts-ignore
      const { invoke } = create(SUT.updateUserJobsCredentialsSuccessFlow({ notification: mockNotification }))
      // when ... we respond to the updateUserJobsCredentialsSuccess action
      invoke(action)
      // then ...validate updateUserJobsCredentialsSuccessFlow
      expect(mockNotification).toHaveBeenCalled()
    })
  })
  describe('updateUserJobsCredentialsFailureFlow', () => {
    it('should correctly handle job credentials update failure', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const action = updateUserJobsCredentialsFailure('FAILED')
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.updateUserJobsCredentialsFailureFlow({ notification: mockNotification }))

      // when ... we respond to the updateUserJobsCredentialsFailures action
      invoke(action)

      // then ...validate failure
      expect(mockNotification).toHaveBeenCalled()
    })
  })
})
