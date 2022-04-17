import { createMiddlewareMock } from '~/../tests/tests.utils'
import { fetchUserFromOAuthSuccess } from '~/modules/Auth/Auth.reducer'
import { OAuthUserResponse } from '~/modules/Auth/Auth.types'
import { hydrateUser, setUser } from '~/modules/User/User.reducer'
import { extractUserFromPayload } from '~/modules/User/User.utils'

import * as SUT from './User.middleware'

describe('modules/User/User.middleware', () => {
  describe('setUserOnAuthFlow', () => {
    it('should correctly handle being called', () => {
      // given ... the authLogin action is fired
      const create = createMiddlewareMock(jest)
      const payloadMock = {
        data: {},
        status: 200,
        headers: {},
      }
      const action = fetchUserFromOAuthSuccess(payloadMock as OAuthUserResponse)

      // when ... we respond to the loginSuccess action
      // @ts-ignore
      const { store, invoke, next } = create(SUT.setUserOnAuthFlow)

      invoke(action)

      // then ...validate setUserOnAuthFlow
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalled()
    })
    it('should correctly set the user data', () => {
      // given ... the fetchUserFromOAuthSuccess action is fired
      const create = createMiddlewareMock(jest)
      const payloadMock = {
        data: {},
        status: 200,
        headers: {},
      }
      const action = fetchUserFromOAuthSuccess(payloadMock as OAuthUserResponse)
      // @ts-ignore

      // when ... we respond to the loginSuccess action
      const { invoke, store } = create(SUT.setUserOnAuthFlow)
      const userData = extractUserFromPayload(action)
      invoke(action)

      // then ... setUser should be called
      expect(store.dispatch).toHaveBeenCalledWith(setUser(userData))
      expect(store.dispatch).toHaveBeenCalledWith(hydrateUser())
    })
  })
})
