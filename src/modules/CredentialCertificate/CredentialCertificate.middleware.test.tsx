import { UserCredentialTypes } from 'api/users/users.types'
import { USER_JOBS_MOCK } from 'modules/UserJobs/UserJobs.test.fixtures'
import { mergeRight } from 'ramda'

import { createMiddlewareStub } from '../../../tests/tests.utils'
import { actions as ApiActions, utils as ApiUtils } from '../../api'
import { constants as ApiUserConstants } from '../../api/users'
import * as SUT from './CredentialCertificate.middleware'
import {
  createCredentialCertificateFailure,
  createCredentialCertificateSuccess,
  setCredentialItemId,
} from './CredentialCertificate.reducer'

describe('modules/CredentialCertificate/CredentialCertificate.middleware', () => {
  describe('createCredentialCertificateFlow', () => {
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
      const create = createMiddlewareStub(jest, { user: { id: userId }, credentialCertificate: mockPayload })

      // when ... we create the user's credentials
      const action = setCredentialItemId('ID')
      // @ts-ignore
      const { store, invoke, next } = create(SUT.createCredentialCertificateFlow)
      invoke(action)

      // then ...
      // ... we should ensure the action continues onto next
      const config = ApiUtils.prependIdToEndpointInConfig(ApiUserConstants.USERS_CREDENTIALS_CREATE_CONFIG)(userId)
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: createCredentialCertificateSuccess,
            onFailure: createCredentialCertificateFailure,
          }),
          mockPayload,
        ),
      )
    })
  })
  describe('createCredentialCertificateSuccessFlow', () => {
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
      const action = createCredentialCertificateSuccess(mockedPayload)
      // @ts-ignore
      const { invoke, next } = create(SUT.createCredentialCertificateSuccessFlow)
      // when ... we respond to the createCredentialCertificateSuccess action
      invoke(action)

      // then ...validate createCredentialCertificateSuccessFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly handle credentialCertificate create success', () => {
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

      const action = createCredentialCertificateSuccess(mockedPayload)
      // @ts-ignore
      const { invoke } = create(SUT.createCredentialCertificateSuccessFlow)
      // when ... we respond to the createCredentialCertificateSuccess action
      invoke(action)

      // then ...validate createCredentialCertificateSuccessFlow
      // expect(store.dispatch).toHaveBeenCalledWith()
    })
  })
  describe('createCredentialCertificateFailureFlow', () => {
    it('should correctly handle credentialCertificate create failure', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const action = createCredentialCertificateFailure('FAILED')
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.createCredentialCertificateFailureFlow({ notification: mockNotification }))

      // when ... we respond to the createCredentialCertificateFailures action
      invoke(action)

      // then ...validate failure
      expect(mockNotification).toHaveBeenCalled()
    })
  })
})
