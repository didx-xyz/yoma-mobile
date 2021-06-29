import { authLoginSuccess } from 'modules/Auth/Auth.reducer'
import { defaultUserLoginResponseData } from 'modules/Auth/Auth.test.fixtures'

import { createMiddlewareMock } from '../../../tests/tests.utils'
import * as SUT from './User.middleware'
import { setUserData } from './User.reducer'
import { selectUserCredentialsFromLoginPayload } from './User.utils'

describe('modules/User/User.middleware', () => {
  describe('setUserOnAuthFlow', () => {
    it('should correctly handle being called', async () => {
      // given ... the authLogin action is fired
      const create = createMiddlewareMock(jest)
      const credentials = defaultUserLoginResponseData
      const action = authLoginSuccess(credentials)
      // @ts-ignore
      const { invoke, next } = create(SUT.setUserOnAuthFlow)

      // when ... we respond to the authLoginSuccess action
      await invoke(action)

      // then ...validate setUserOnAuthFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly set the user data', async () => {
      // given ... the authLogin action is fired
      const create = createMiddlewareMock(jest)
      const credentials = defaultUserLoginResponseData
      const action = authLoginSuccess(credentials)
      // @ts-ignore
      const { invoke, store } = create(SUT.setUserOnAuthFlow)
      const userData = selectUserCredentialsFromLoginPayload(action)

      // when ... we respond to the authLoginSuccess action
      await invoke(action)

      // then ... setUserData should be called
      expect(store.dispatch).toHaveBeenCalledWith(setUserData(userData))
    })
  })
})
