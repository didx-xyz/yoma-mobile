import { authLoginSuccess } from 'modules/Auth/Auth.reducer'
import { defaultUserLoginResponseData } from 'modules/Auth/Auth.test.fixtures'

import { createMiddlewareStub } from '../../../tests/tests.utils'
import * as SUT from './User.middleware'
import { setUserCredentials } from './User.reducer'
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
})
