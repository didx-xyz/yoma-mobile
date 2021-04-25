import { createMiddlewareMock } from '../../../tests/tests.utils'
import * as SUT from './Auth.middleware'
import { authLogin, authLoginFailure, authLoginSuccess } from './Auth.reducer'

describe('modules/Auth/Auth.middleware', () => {
  describe('authLoginFlow', () => {
    it('should ignore other actions', async () => {
      // given ... an action is fired
      const create = createMiddlewareMock(jest)
      const mockApi = jest.fn()
      const action = { type: 'TEST', payload: {} }
      // @ts-ignore
      const { invoke, next } = create(SUT.authLoginFlow(mockApi))

      // when ... we invoke another action
      await invoke(action)

      // then ... next should have been called with the action
      expect(next).toHaveBeenCalledWith(action)
      expect(mockApi).not.toHaveBeenCalled()
    })

    it('should correctly call the api with the given credentials', async () => {
      // given ... the authLogin action is fired
      const create = createMiddlewareMock(jest)
      const credentials = {
        email: 'USER EMAIL',
        password: 'USER PASSWORD',
      }
      const mockApi = jest.mock('api', () => ({ auth: jest.fn }))
      const action = authLogin(credentials)
      // @ts-ignore
      const { invoke, next } = create(SUT.authLoginFlow(mockApi))

      // when ... we respond to the authLogin action
      await invoke(action)

      // then ... the login API should be called
      expect(next).toHaveBeenCalledWith(action)
      expect(mockApi).toHaveBeenCalled()
    })

    it('should correctly handle a successful login', async () => {
      // given ... the login api is called and returns successfully
      const create = createMiddlewareMock(jest)
      const credentials = {
        email: 'USER EMAIL',
        password: 'USER PASSWORD',
      }
      const response = {
        email: 'USER EMAIL',
        password: 'USER PASSWORD',
      }
      const mockApi = jest.fn().mockReturnValue(response)
      const action = authLogin(credentials)
      // @ts-ignore
      const { invoke } = create(SUT.authLoginFlow(mockApi))

      // when ... we respond to the successful state
      await invoke(action)

      // then ... the success action should be called with the response
      expect(authLoginSuccess).toHaveBeenCalledWith(response)
    })
    it('should correctly handle a failed login', async () => {
      // given ... the login api is called and returns a failure
      const create = createMiddlewareMock(jest)
      const credentials = {
        email: 'USER EMAIL',
        password: 'USER PASSWORD',
      }
      const response = {
        error: 'AN ERROR MESSAGE',
      }

      const mockApi = jest.fn().mockRejectedValue(response)
      const action = authLogin(credentials)
      // @ts-ignore
      const { invoke } = create(SUT.authLoginFlow(mockApi))

      // when ... we respond to the failure state
      await invoke(action)

      // then ... the failure action should be called with the error response
      expect(authLoginFailure).toHaveBeenCalledWith(response)
    })
  })
})
