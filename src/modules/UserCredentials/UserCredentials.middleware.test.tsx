import { mergeRight } from 'ramda'

import { createMiddlewareStub } from '../../../tests/tests.utils'
import { actions as ApiActions, utils as ApiUtils } from '../../api'
import { constants as ApiUsersConstants } from '../../api/users'
import * as SUT from './UserCredentials.middleware'
import {
  fetchUserCredentials,
  fetchUserCredentialsFailure,
  fetchUserCredentialsSuccess,
  setUserCredentials,
} from './UserCredentials.reducer'
import { USER_CREDENTIALS_RESPONSE } from './UserCredentials.test.fixtures'
import { extractUserCredentialsFromPayload } from './UserCredentials.utils'

describe('modules/UserCredentials/UserCredentials.middleware', () => {
  describe('fetchUserCredentialsFlow', () => {
    it('should correctly handle being called', () => {
      // given ... a user object with an id in state
      const userId = 'A USER ID'
      const create = createMiddlewareStub(jest, { user: { id: userId } })
      const config = ApiUtils.prependIdToEndpointInConfig(ApiUsersConstants.USERS_CREDENTIALS_GET_BY_ID_CONFIG)(userId)

      // when ... we request to get all the user's credentials
      const action = fetchUserCredentials()
      // @ts-ignore
      const { store, invoke, next } = create(SUT.fetchUserCredentialsFlow)
      invoke(action)

      // then ...
      // ... we should ensure the action continues onto next
      expect(next).toHaveBeenCalledWith(action)

      // ... we should fetch the users credentials
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: fetchUserCredentialsSuccess,
            onFailure: fetchUserCredentialsFailure,
          }),
          action.payload,
        ),
      )
    })
  })
  describe('fetchUserCredentialsSuccessFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const mockResponseData = USER_CREDENTIALS_RESPONSE

      const action = fetchUserCredentialsSuccess(mockResponseData)
      // @ts-ignore
      const { invoke, next } = create(SUT.fetchUserCredentialsSuccessFlow)
      // when ... we respond to the fetchUserCredentialsSuccess action
      invoke(action)
      // then ...validate fetchUserCredentialsSuccessFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly set user credentials on successful fetch', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const mockResponseData = {
        data: USER_CREDENTIALS_RESPONSE,
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }

      const action = fetchUserCredentialsSuccess(mockResponseData)
      // @ts-ignore
      const { store, invoke } = create(SUT.fetchUserCredentialsSuccessFlow)
      // when ... we respond to the fetchUserCredentialsSuccess action
      invoke(action)
      // then ...validate fetchUserCredentialsSuccessFlow
      const userCredentials = extractUserCredentialsFromPayload(action)
      expect(store.dispatch).toHaveBeenCalledWith(setUserCredentials(userCredentials))
    })
  })
  describe('fetchUserCredentialsFailureFlow', () => {
    it('should correctly handle user credentials fetch failure', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const action = fetchUserCredentialsFailure('FAILED')
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.fetchUserCredentialsFailureFlow({ notification: mockNotification }))

      // when ... we respond to the fetchUserCredentialsFailures action
      invoke(action)

      // then ...validate failure
      expect(mockNotification).toHaveBeenCalled()
    })
  })
})
