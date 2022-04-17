import { fetchUserFromOAuthSuccess } from '~/modules/Auth/Auth.reducer'

import { createMiddlewareMock } from '../../../tests/tests.utils'
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
      const action = fetchUserFromOAuthSuccess(payloadMock as any)

      // when ... we respond to the loginSuccess action
      // @ts-ignore
      const { store, invoke, next } = create(SUT.setUserOnAuthFlow)

      invoke(action)

      // then ...validate setUserOnAuthFlow
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalled()
    })
  })
})
