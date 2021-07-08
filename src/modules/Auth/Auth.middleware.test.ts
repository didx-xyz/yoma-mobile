import { resetAppData } from 'modules/App/App.reducer'
import { INITIAL_STATE } from 'modules/Auth/Auth.reducer'
import { mergeRight } from 'ramda'

import { createMiddlewareMock } from '../../../tests/tests.utils'
import { actions as ApiActions } from '../../api'
import { constants as ApiAuthConstants } from '../../api/auth'
import * as SUT from './Auth.middleware'
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  register,
  registerFailure,
  registerSuccess,
  setAuthCredentials,
  setSecureRefreshToken,
  setSecureRefreshTokenFailure,
  setSecureRefreshTokenSuccess,
} from './Auth.reducer'
import {
  defaultUserLoginResponseData,
  defaultUserRegistrationResponseData,
  userRegistrationData,
} from './Auth.test.fixtures'

describe('modules/Auth/Auth.middleware', () => {
  describe('loginFlow', () => {
    it('should correctly handle being called', async () => {
      // given ... the login action is fired
      const create = createMiddlewareMock(jest)
      const credentials = {
        email: 'USER EMAIL',
        password: 'USER PASSWORD',
      }
      const action = login(credentials)
      // @ts-ignore
      const { invoke, next, store } = create(SUT.loginFlow)

      // when ... we respond to the login action
      await invoke(action)

      // then ... the login API should be called
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalled()
    })
    it('should correctly login the user in', async () => {
      // given ... the login action is fired
      const create = createMiddlewareMock(jest)
      const credentials = {
        email: 'USER EMAIL',
        password: 'USER PASSWORD',
      }
      const action = login(credentials)
      // @ts-ignore
      const { invoke, store } = create(SUT.loginFlow)

      // when ... we respond to the login action
      await invoke(action)

      // then ... the login API should be called
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(ApiAuthConstants.LOGIN_CONFIG, {
            isTokenRequired: false,
            onSuccess: loginSuccess,
            onFailure: loginFailure,
          }),
          credentials,
        ),
      )
    })
  })
  describe('loginSuccessFlow', () => {
    it('should correctly catch a successful login action', async () => {
      // given ... the loginSuccess action is fired
      const create = createMiddlewareMock(jest)
      const action = loginSuccess(defaultUserLoginResponseData)
      const mockNotification = jest.fn()
      // @ts-ignore
      const { store, invoke, next } = create(SUT.loginSuccessFlow({ notification: mockNotification }))

      // when ... we respond to the loginSuccess action
      await invoke(action)

      // then ... we should correctly catch the action
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalled()
    })
    it('should correctly send a notification to the user', async () => {
      // given ... the login action is fired
      const create = createMiddlewareMock(jest)
      // @ts-ignore
      const action = loginSuccess(defaultUserLoginResponseData)
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.loginSuccessFlow({ notification: mockNotification }))

      // when ... we respond to the login action
      await invoke(action)

      // then ... the login API should be called
      expect(mockNotification).toHaveBeenCalled()
    })
    it('should extract and transmit auth credentials and refresh token', async () => {
      // given ... the login action is fired
      const create = createMiddlewareMock(jest)
      // @ts-ignore
      const action = loginSuccess(defaultUserLoginResponseData)
      const mockNotification = jest.fn()
      // @ts-ignores
      const { store, invoke } = create(SUT.loginSuccessFlow({ notification: mockNotification }))

      // when ... we respond to the login action
      await invoke(action)

      // then ... the login API should be called
      expect(store.dispatch).toHaveBeenCalledWith(setAuthCredentials({ token: 'USER_TOKEN', expiresAt: 'EXPIRY_DATE' }))
      expect(store.dispatch).toHaveBeenCalledWith(setSecureRefreshToken('REFRESH_TOKEN'))
    })
  })
  describe('setSecureRefreshTokenFlow', () => {
    it('should correctly handle being called', async () => {
      // given ... the loginSuccess action is fired
      const create = createMiddlewareMock(jest)
      const action = setSecureRefreshToken('REFRESH_TOKEN')
      const setSecureItemStub = jest.fn().mockResolvedValue(true)
      // @ts-ignore
      const { next, invoke } = create(SUT.setSecureRefreshTokenFlow(setSecureItemStub))

      // when ... we respond to the loginSuccess action
      await invoke(action)

      // then ...
      // ... we should correctly attempt to store the token
      expect(setSecureItemStub).toHaveBeenCalled()
      // ... and should call next with the action
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly save the refresh token in secure store', async () => {
      // given ... the loginSuccess action is fired
      const create = createMiddlewareMock(jest)
      const action = setSecureRefreshToken('REFRESH_TOKEN')
      const setSecureItemStub = jest.fn().mockResolvedValue(true)
      // @ts-ignore
      const { store, invoke } = create(SUT.setSecureRefreshTokenFlow(setSecureItemStub))

      // when ... we successfully store the refresh token
      await invoke(action)

      // then ...
      // ... we should notify of the success
      expect(setSecureItemStub).toHaveBeenCalledWith('refreshToken', 'REFRESH_TOKEN')
      expect(store.dispatch).toHaveBeenCalledWith(setSecureRefreshTokenSuccess())
    })
    it('should log an error if it fails to set the refresh token', async () => {
      // given ... the loginSuccess action is fired
      const create = createMiddlewareMock(jest)
      const action = setSecureRefreshToken('REFRESH_TOKEN')
      const setSecureItemStub = jest.fn().mockRejectedValue('SOME ERROR')
      // @ts-ignore
      const { store, invoke } = create(SUT.setSecureRefreshTokenFlow(setSecureItemStub))

      // when ... we fail to save the refresh token
      await invoke(action)

      // then ...
      // ... we should log the error in a failure action
      expect(setSecureItemStub).toHaveBeenCalledWith('refreshToken', 'REFRESH_TOKEN')
      expect(store.dispatch).toHaveBeenCalledWith(setSecureRefreshTokenFailure('SOME ERROR'))
    })
  })
  describe('loginFailureFlow', () => {
    it('should correctly send a notification to the user', async () => {
      // given ... the login action is fired
      const create = createMiddlewareMock(jest)
      // @ts-ignore
      const response = 'ERROR: FAILED FOR A REASON'
      const action = loginFailure(response)
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.loginFailureFlow({ notification: mockNotification }))

      // when ... we respond to the login action
      await invoke(action)

      // then ... the login API should be called
      expect(mockNotification).toHaveBeenCalled()
    })
  })
  describe('authLogoutFlow', () => {
    it('should correctly logout the user', async () => {
      // given ... the logout action is fired
      const create = createMiddlewareMock(jest)
      const action = logout()
      // @ts-ignore
      const { store, invoke } = create(SUT.logoutFlow)

      // when ... we respond to the logout action
      await invoke(action)

      // then ... the reset APP should be called
      expect(store.dispatch).toHaveBeenCalledWith(resetAppData())
    })
  })
  describe('authRegistrationFlow', () => {
    it('should ignore other actions', async () => {
      // given ... an action is fired
      const create = createMiddlewareMock(jest)
      const mockApi = jest.fn()
      const action = { type: 'TEST', payload: {} }
      // @ts-ignore
      const { invoke, next } = create(SUT.registrationFlow)

      // when ... we invoke another action
      await invoke(action)

      // then ... next should have been called with the action
      expect(next).toHaveBeenCalledWith(action)
      expect(mockApi).not.toHaveBeenCalled()
    })

    it('should correctly handle registration', async () => {
      // given ... the register action is fired
      const create = createMiddlewareMock(jest)
      const action = register(userRegistrationData)
      // @ts-ignore
      const { invoke, next } = create(SUT.registrationFlow)

      // when ... we respond to the register action
      await invoke(action)

      // then ... the register API should be called
      expect(next).toHaveBeenCalledWith(action)
    })

    it('should correctly register a user', async () => {
      // given ... the register api is called and returns successfully
      const create = createMiddlewareMock(jest)
      const action = register(userRegistrationData)

      // @ts-ignore
      const { store, invoke } = create(SUT.registrationFlow)

      // when ... we respond to the successful state
      await invoke(action)

      // then ... the success action should be dispatched with the response
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(ApiAuthConstants.REGISTER_CONFIG, {
            isTokenRequired: false,
            onSuccess: registerSuccess,
            onFailure: registerFailure,
          }),
          userRegistrationData,
        ),
      )
    })
  })
  describe('authRegistrationSuccessFlow', () => {
    it('should correctly send a notification to the user', async () => {
      // middleware is dependent on a populated state
      const state = {
        auth: {
          ...INITIAL_STATE,
          email: 'EMAIL',
          password: 'PASSWORD',
        },
      }
      const create = createMiddlewareMock(jest, state)
      // @ts-ignore
      const response = defaultUserRegistrationResponseData
      const action = registerSuccess(response)
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.registrationSuccessFlow({ notification: mockNotification }))

      await invoke(action)

      // then ... the notification should be called
      expect(mockNotification).toHaveBeenCalled()
    })
  })
  describe('authRegistrationFailureFlow', () => {
    it('should correctly send a notification to the user', async () => {
      // given ... the register action is fired
      const create = createMiddlewareMock(jest)
      // @ts-ignore
      const response = 'ERROR: FAILED FOR A REASON'
      const action = registerFailure(response)
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.registrationFailureFlow({ notification: mockNotification }))

      // when ... we respond to the register action
      await invoke(action)

      // then ... the notification should be called
      expect(mockNotification).toHaveBeenCalled()
    })
  })
})
