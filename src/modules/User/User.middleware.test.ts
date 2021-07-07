import { authLoginSuccess } from 'modules/Auth/Auth.reducer'
import { defaultUserLoginResponseData } from 'modules/Auth/Auth.test.fixtures'

import { createMiddlewareMock } from '../../../tests/tests.utils'
import * as SUT from './User.middleware'
import { setUser } from './User.reducer'
import { selectUserFromLoginPayload } from './User.utils'

describe('modules/User/User.middleware', () => {
  describe('setUserOnAuthFlow', () => {
    it('should correctly handle being called', () => {
      // given ... the authLogin action is fired
      const create = createMiddlewareMock(jest)
      const credentials = defaultUserLoginResponseData
      const action = authLoginSuccess(credentials)
      // @ts-ignore
      const { store, invoke, next } = create(SUT.setUserOnAuthFlow)

      // when ... we respond to the authLoginSuccess action
      invoke(action)

      // then ...validate setUserOnAuthFlow
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalled()
    })
    it('should correctly set the user data', () => {
      // given ... the authLogin action is fired
      const create = createMiddlewareMock(jest)
      const credentials = defaultUserLoginResponseData
      const action = authLoginSuccess(credentials)
      // @ts-ignore
      const { invoke, store } = create(SUT.setUserOnAuthFlow)
      const userData = selectUserFromLoginPayload(action)

      // when ... we respond to the authLoginSuccess action
      invoke(action)

      // then ... setUser should be called
      expect(store.dispatch).toHaveBeenCalledWith(setUser(userData))
    })
  })
})
