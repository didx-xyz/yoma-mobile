import { createMiddlewareMock } from '../../../tests/tests.utils'
import * as SUT from './Auth.middleware'
import {
  authLogin,
  authLoginFailure,
  authLoginSuccess,
  authRegistration,
  authRegistrationFailure,
  authRegistrationSuccess,
  setAuthCredentials,
  setSecureRefreshTokenFailure,
  setSecureRefreshTokenSuccess,
} from './Auth.reducer'
import {
  defaultUserLoginResponseData,
  defaultUserRegistrationResponseData,
  userRegistrationData,
} from './Auth.test.fixtures'

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
  describe('setSecureRefreshTokenFlow', () => {
    it('should correctly handle being called', async () => {
      // given ... the authLoginSuccess action is fired
      const create = createMiddlewareMock(jest)
      const action = authLoginSuccess(defaultUserLoginResponseData)
      const setSecureItemStub = jest.fn().mockResolvedValue(true)
      // @ts-ignore
      const { next, invoke } = create(SUT.setSecureRefreshTokenFlow(setSecureItemStub))

      // when ... we respond to the authLoginSuccess action
      await invoke(action)

      // then ...
      // ... we should correctly attempt to store the token
      expect(setSecureItemStub).toHaveBeenCalled()
      // ... and should call next with the action
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly save the refresh token in secure store', async () => {
      // given ... the authLoginSuccess action is fired
      const create = createMiddlewareMock(jest)
      const action = authLoginSuccess(defaultUserLoginResponseData)
      const setSecureItemStub = jest.fn().mockResolvedValue(true)
      // @ts-ignore
      const { store, invoke } = create(SUT.setSecureRefreshTokenFlow(setSecureItemStub))

      // when ... we successfully store the refresh token
      await invoke(action)

      // then ...
      // ... we should notify of the success
      expect(store.dispatch).toHaveBeenCalledWith(setSecureRefreshTokenSuccess())
    })
    it('should log an error if it fails to set the refresh token', async () => {
      // given ... the authLoginSuccess action is fired
      const create = createMiddlewareMock(jest)
      const action = authLoginSuccess(defaultUserLoginResponseData)
      const setSecureItemStub = jest.fn().mockRejectedValue('SOME ERROR')
      // @ts-ignore
      const { store, invoke } = create(SUT.setSecureRefreshTokenFlow(setSecureItemStub))

      // when ... we fail to save the refresh token
      await invoke(action)

      // then ...
      // ... we should log the error in a failure action
      expect(store.dispatch).toHaveBeenCalledWith(setSecureRefreshTokenFailure('SOME ERROR'))
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
  describe('authRegistrationFlow', () => {
    it('should ignore other actions', async () => {
      // given ... an action is fired
      const create = createMiddlewareMock(jest)
      const mockApi = jest.fn()
      const action = { type: 'TEST', payload: {} }
      // @ts-ignore
      const { invoke, next } = create(SUT.authRegistrationFlow(mockApi))

      // when ... we invoke another action
      await invoke(action)

      // then ... next should have been called with the action
      expect(next).toHaveBeenCalledWith(action)
      expect(mockApi).not.toHaveBeenCalled()
    })

    it('should correctly call the api with the given registration data', async () => {
      // given ... the authRegistration action is fired
      const create = createMiddlewareMock(jest)
      const mockApi = { api: { auth: { register: jest.fn((_x: any) => Promise.resolve('RESOLVED VALUE')) } } }
      const action = authRegistration(userRegistrationData)
      // @ts-ignore
      const { invoke, next } = create(SUT.authRegistrationFlow(mockApi))

      // when ... we respond to the authRegistration action
      await invoke(action)

      // then ... the register API should be called
      expect(next).toHaveBeenCalledWith(action)
      expect(mockApi.api.auth.register).toHaveBeenCalled()
    })

    it('should correctly handle a successful registration', async () => {
      // given ... the register api is called and returns successfully
      const create = createMiddlewareMock(jest)
      const response = defaultUserRegistrationResponseData
      const mockApi = { api: { auth: { register: jest.fn((_x: any) => Promise.resolve(response)) } } }
      const action = authRegistration(userRegistrationData)

      // @ts-ignore
      const { store, invoke } = create(SUT.authRegistrationFlow(mockApi))

      // when ... we respond to the successful state
      await invoke(action)

      // then ... the success action should be dispatched with the response
      expect(store.dispatch).toHaveBeenCalledWith(authRegistrationSuccess(response))
    })
    it('should correctly handle a failed registration', async () => {
      // given ... the register api is called and returns a failure
      const create = createMiddlewareMock(jest)
      const response = 'ERROR: FAILED FOR A REASON'
      const mockApi = { api: { auth: { register: jest.fn((_x: any) => Promise.reject(response)) } } }
      const action = authRegistration(userRegistrationData)

      // @ts-ignore
      const { store, invoke } = create(SUT.authRegistrationFlow(mockApi))

      // when ... we respond to the failure state
      await invoke(action)

      // then ... the failure action should be called with the error response
      expect(store.dispatch).toHaveBeenCalledWith(authRegistrationFailure(response))
    })
  })

  describe('authRegistrationSuccessFlow', () => {
    it('should correctly send a notification to the user', async () => {
      // given ... the authRegistration action is fired
      const create = createMiddlewareMock(jest)
      // @ts-ignore
      const response = defaultUserRegistrationResponseData
      const action = authRegistrationSuccess(response)
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.authRegistrationSuccessFlow({ notification: mockNotification }))

      // when ... we respond to the authRegistration action
      await invoke(action)

      // then ... the notification should be called
      expect(mockNotification).toHaveBeenCalled()
    })
  })

  describe('authRegistrationFailureFlow', () => {
    it('should correctly send a notification to the user', async () => {
      // given ... the authRegistration action is fired
      const create = createMiddlewareMock(jest)
      // @ts-ignore
      const response = 'ERROR: FAILED FOR A REASON'
      const action = authRegistrationFailure(response)
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.authRegistrationFailureFlow({ notification: mockNotification }))

      // when ... we respond to the authRegistration action
      await invoke(action)

      // then ... the notification should be called
      expect(mockNotification).toHaveBeenCalled()
    })
  })
})
