import { UserCredentialTypes } from 'api/users/users.types'
import { USER_JOBS_MOCK } from 'modules/UserJobs/UserJobs.test.fixtures'
import { mergeRight } from 'ramda'

import { createMiddlewareStub } from '../../../tests/tests.utils'
import { actions as ApiActions, utils as ApiUtils } from '../../api'
import { constants as ApiUserConstants } from '../../api/users'
import * as SUT from './CredentialItems.middleware'
import {
  createCredentialItemFailure,
  createCredentialItemSuccess,
  setCredentialItemId,
} from './CredentialItems.reducer'

describe('modules/CredentialItems/CredentialItems.middleware', () => {
  describe('createCredentialItemFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const userId = 'A USER ID'
      const mockPayload = {
        type: UserCredentialTypes.Job,
        credentialItemId: 'ID',
        startTime: 'START_TIME',
        endTime: 'END_TIME',
        requestVerification: false,
      }
      const create = createMiddlewareStub(jest, { user: { id: userId }, credentialItems: mockPayload })

      // when ... we create the user's credentials
      const action = setCredentialItemId('ID')
      // @ts-ignore
      const { store, invoke, next } = create(SUT.createCredentialItemFlow)
      invoke(action)

      // then ...
      // ... we should ensure the action continues onto next
      const config = ApiUtils.prependIdToEndpointInConfig(ApiUserConstants.USERS_CREDENTIALS_CREATE_CONFIG)(userId)
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: createCredentialItemSuccess,
            onFailure: createCredentialItemFailure,
          }),
          mockPayload,
        ),
      )
    })
  })
  describe('createCredentialItemSuccessFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const mockedPayload = {
        data: {
          data: USER_JOBS_MOCK,
        },
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }
      const action = createCredentialItemSuccess(mockedPayload)
      // @ts-ignore
      const { invoke, next } = create(SUT.createCredentialItemSuccessFlow)
      // when ... we respond to the createCredentialItemSuccess action
      invoke(action)

      // then ...validate createCredentialItemSuccessFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly handle credentialItem create success', () => {
      // given ...
      const create = createMiddlewareStub(jest)

      const mockedPayload = {
        data: {
          data: USER_JOBS_MOCK,
        },
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }

      const action = createCredentialItemSuccess(mockedPayload)
      // @ts-ignore
      const { invoke } = create(SUT.createCredentialItemSuccessFlow)
      // when ... we respond to the createCredentialItemSuccess action
      invoke(action)

      // then ...validate createCredentialItemSuccessFlow
      // expect(store.dispatch).toHaveBeenCalledWith()
    })
  })
  describe('createCredentialItemFailureFlow', () => {
    it('should correctly handle credentialItem create failure', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const action = createCredentialItemFailure('FAILED')
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.createCredentialItemFailureFlow({ notification: mockNotification }))

      // when ... we respond to the createCredentialItemFailures action
      invoke(action)

      // then ...validate failure
      expect(mockNotification).toHaveBeenCalled()
    })
  })
})
