import { createMiddlewareMock } from '../../../tests/tests.utils'
import * as SUT from './Auth.middleware'
import { authLogin, authLoginFailure, authLoginSuccess, setAuthCredentials } from './Auth.reducer'
import { defaultUserLoginResponseData } from './Auth.test.fixtures'

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
      const mockApi = { api: { auth: { login: jest.fn((_x: any) => Promise.resolve('RESOLVED VALUE')) } } }
      const action = authLogin(credentials)
      // @ts-ignore
      const { invoke, next } = create(SUT.authLoginFlow(mockApi))

      // when ... we respond to the authLogin action
      await invoke(action)

      // then ... the login API should be called
      expect(next).toHaveBeenCalledWith(action)
      expect(mockApi.api.auth.login).toHaveBeenCalled()
    })

    it('should correctly handle a successful login', async () => {
      // given ... the login api is called and returns successfully
      const create = createMiddlewareMock(jest)
      const credentials = {
        email: 'USER EMAIL',
        password: 'USER PASSWORD',
      }
      const response = defaultUserLoginResponseData
      const mockApi = { api: { auth: { login: jest.fn((_x: any) => Promise.resolve(response)) } } }
      const action = authLogin(credentials)

      // @ts-ignore
      const { store, invoke } = create(SUT.authLoginFlow(mockApi))

      // when ... we respond to the successful state
      await invoke(action)

      // then ... the success action should be dispatched with the response
      expect(store.dispatch).toHaveBeenCalledWith(authLoginSuccess(response))
    })
    it('should correctly handle a failed login', async () => {
      // given ... the login api is called and returns a failure
      const create = createMiddlewareMock(jest)
      const credentials = {
        email: 'USER EMAIL',
        password: 'USER PASSWORD',
      }
      const response = 'ERROR: FAILED FOR A REASON'
      const mockApi = { api: { auth: { login: jest.fn((_x: any) => Promise.reject(response)) } } }
      const action = authLogin(credentials)

      // @ts-ignore
      const { store, invoke } = create(SUT.authLoginFlow(mockApi))

      // when ... we respond to the failure state
      await invoke(action)

      // then ... the failure action should be called with the error response
      expect(store.dispatch).toHaveBeenCalledWith(authLoginFailure(response))
    })
  })
  describe('authSetCredentialsFlow', () => {
    it('should catch a successful login action', async () => {
      // given ... the authLoginSuccess action is fired
      const create = createMiddlewareMock(jest)
      const action = authLoginSuccess(defaultUserLoginResponseData)
      const mockNotification = jest.fn()
      // @ts-ignore
      const { store, invoke } = create(SUT.authSetCredentialsFlow({ notification: mockNotification }))

      // when ... we respond to the authLoginSuccess action
      await invoke(action)

      // then ... we should correctly catch the action
      expect(store.dispatch).toHaveBeenCalled()
    })
    it('should correctly send a notification to the user', async () => {
      // given ... the authLogin action is fired
      const create = createMiddlewareMock(jest)
      // @ts-ignore
      const action = authLoginSuccess(defaultUserLoginResponseData)
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.authSetCredentialsFlow({ notification: mockNotification }))

      // when ... we respond to the authLogin action
      await invoke(action)

      // then ... the login API should be called
      expect(mockNotification).toHaveBeenCalled()
    })
    it('should dispatch the setAuthCredentials action with the correct data', async () => {
      // given ... the authLogin action is fired
      const create = createMiddlewareMock(jest)
      // @ts-ignore
      const action = authLoginSuccess(defaultUserLoginResponseData)
      const mockNotification = jest.fn()
      // @ts-ignore
      const { store, invoke } = create(SUT.authSetCredentialsFlow({ notification: mockNotification }))

      // when ... we respond to the authLogin action
      await invoke(action)

      // then ... the login API should be called
      expect(store.dispatch).toHaveBeenCalledWith(
        setAuthCredentials({ refreshToken: 'REFRESH_TOKEN', token: 'USER_TOKEN', expiresAt: 'EXPIRY_DATE' }),
      )
    })
  })
  describe('authLoginFailureFlow', () => {
    it('should correctly send a notification to the user', async () => {
      // given ... the authLogin action is fired
      const create = createMiddlewareMock(jest)
      // @ts-ignore
      const response = 'ERROR: FAILED FOR A REASON'
      const action = authLoginFailure(response)
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.authLoginFailureFlow({ notification: mockNotification }))

      // when ... we respond to the authLogin action
      await invoke(action)

      // then ... the login API should be called
      expect(mockNotification).toHaveBeenCalled()
    })
  })
})
