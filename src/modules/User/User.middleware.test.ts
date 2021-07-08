import { authLoginSuccess } from 'modules/Auth/Auth.reducer'
import { defaultUserLoginResponseData } from 'modules/Auth/Auth.test.fixtures'
import { mergeRight } from 'ramda'

import { createMiddlewareStub } from '../../../tests/tests.utils'
import { actions as ApiActions, utils as ApiUtils } from '../../api'
import { constants as ApiUsersConstants } from '../../api/users'
import * as SUT from './User.middleware'
import {
  fetchUserCredentials,
  fetchUserCredentialsFailure,
  fetchUserCredentialsSuccess,
  setUserCredentials,
} from './User.reducer'
import { selectUserCredentialsFromLoginPayload } from './User.utils'

describe('modules/User/User.middleware', () => {
  describe('setUserOnAuthFlow', () => {
    it('should correctly handle being called', async () => {
      // given ... the authLogin action is fired
      const create = createMiddlewareStub(jest)
      const credentials = defaultUserLoginResponseData
      const action = authLoginSuccess(credentials)
      // @ts-ignore
      const { store, invoke, next } = create(SUT.setUserOnAuthFlow)

      // when ... we respond to the authLoginSuccess action
      await invoke(action)

      // then ...validate setUserOnAuthFlow
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalled()
    })
    it('should correctly set the user data', async () => {
      // given ... the authLogin action is fired
      const create = createMiddlewareStub(jest)
      const credentials = defaultUserLoginResponseData
      const action = authLoginSuccess(credentials)
      // @ts-ignore
      const { invoke, store } = create(SUT.setUserOnAuthFlow)
      const userData = selectUserCredentialsFromLoginPayload(action)

      // when ... we respond to the authLoginSuccess action
      await invoke(action)

      // then ... setUserCredentials should be called
      expect(store.dispatch).toHaveBeenCalledWith(setUserCredentials(userData))
    })
  })
  describe('fetchUserCredentialsFlow', () => {
    it('should correctly handle being called', async () => {
      // given ... a user object with an id in state
      const userId = 'A USER ID'
      const create = createMiddlewareStub(jest, { user: { id: userId } })
      const config = ApiUtils.prependIdToEndpointInConfig(ApiUsersConstants.USERS_CREDENTIALS_GET_BY_ID_CONFIG)(userId)

      // when ... we request to get all the user's credentials
      const action = fetchUserCredentials()
      // @ts-ignore
      const { store, invoke, next } = create(SUT.fetchUserCredentialsFlow)
      await invoke(action)

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
})
