import { resetAppData } from 'modules/App/App.reducer'
import { authSocialLoginFailure, authSocialRegistrationFailure, INITIAL_STATE } from 'modules/Auth/Auth.reducer'
import { mergeRight } from 'ramda'

import { createMiddlewareStub } from '../../../tests/tests.utils'
import { actions as ApiActions } from '../../api'
import { constants as ApiAuthConstants } from '../../api/auth'
import { actions as AppActions } from '../App'
import * as SUT from './Auth.middleware'
import {
  authLogin,
  authLoginFailure,
  authLoginSuccess,
  authLogout,
  authRegistration,
  authRegistrationFailure,
  authRegistrationSuccess,
  authSocialLogin,
  authSocialLoginSuccess,
  authSocialRegistration,
  authSocialRegistrationSuccess,
  setAuthCredentials,
  setSecureRefreshToken,
  setSecureRefreshTokenFailure,
  setSecureRefreshTokenSuccess,
} from './Auth.reducer'
import {
  defaultUserLoginResponseData,
  defaultUserRegistrationResponseData,
  userRegistrationData,
  userSocialLoginData,
  userSocialRegistrationData,
} from './Auth.test.fixtures'

describe('modules/Auth/Auth.middleware', () => {
  describe('authLoginFlow', () => {
    it('should correctly handle being called', () => {
      // given ... the authLogin action is fired
      const create = createMiddlewareStub(jest)
      const credentials = {
        email: 'USER EMAIL',
        password: 'USER PASSWORD',
      }
      const action = authLogin(credentials)
      // @ts-ignore
      const { invoke, next, store } = create(SUT.authLoginFlow)

      // when ... we respond to the authLogin action
      invoke(action)

      // then ... the login API should be called
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalled()
    })
    it('should correctly login the user in', () => {
      // given ... the authLogin action is fired
      const create = createMiddlewareStub(jest)
      const credentials = {
        email: 'USER EMAIL',
        password: 'USER PASSWORD',
      }
      const action = authLogin(credentials)
      // @ts-ignore
      const { invoke, store } = create(SUT.authLoginFlow)

      // when ... we respond to the authLogin action
      invoke(action)

      // then ... the login API should be called
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(ApiAuthConstants.LOGIN_CONFIG, {
            isTokenRequired: false,
            onSuccess: authLoginSuccess,
            onFailure: authLoginFailure,
          }),
          credentials,
        ),
      )
    })
  })
  describe('authSocialLoginFlow', () => {
    it('should correctly handle being called', () => {
      // given ... the action is fired
      const create = createMiddlewareStub(jest)
      const mockSocialLogin = jest.fn().mockResolvedValue(true)
      const action = authSocialLogin('provider')
      // @ts-ignore
      const { invoke, next } = create(SUT.authSocialLoginFlow({ ssoAuth: mockSocialLogin }))
      invoke(action)

      expect(next).toHaveBeenCalledWith(action)
    })
    it('should provide feedback on login failure', () => {
      // given ... the action is fired
      const create = createMiddlewareStub(jest)
      const mockSocialLogin = jest.fn().mockImplementation(() => {
        throw new Error('FAILURE')
      })
      const action = authSocialLogin('provider')
      // @ts-ignore
      const { store, invoke } = create(SUT.authSocialLoginFlow({ ssoAuth: mockSocialLogin }))
      invoke(action)

      expect(store.dispatch).toHaveBeenCalledWith(authSocialLoginFailure('FAILURE'))
    })
    it('should correctly get user data from the provider', () => {
      const create = createMiddlewareStub(jest)
      const mockNotification = jest.fn()
      const mockSocialLogin = jest.fn().mockResolvedValue(true)
      // given ... the action is fired
      const action = authSocialLogin('provider')
      // @ts-ignore
      const { invoke } = create(SUT.authSocialLoginFlow({ ssoAuth: mockSocialLogin, notification: mockNotification }))
      invoke(action)

      expect(mockSocialLogin).toHaveBeenCalled()
    })
  })
  describe('authSocialLoginSuccessFlow', () => {
    it('should correctly handle being called', () => {
      const create = createMiddlewareStub(jest)
      // given ... the action is fired
      const action = authSocialLoginSuccess(userSocialRegistrationData)
      // @ts-ignore
      const { invoke, next } = create(SUT.authSocialLoginSuccessFlow)
      invoke(action)

      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly login the user', () => {
      // given ... the action is fired
      const create = createMiddlewareStub(jest)
      const action = authSocialLoginSuccess(userSocialLoginData)
      // @ts-ignore
      const { invoke, store } = create(SUT.authSocialLoginSuccessFlow)
      invoke(action)

      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(ApiAuthConstants.LOGIN_SOCIAL_CONFIG, {
            onSuccess: authLoginSuccess,
            onFailure: authLoginFailure,
          }),
          userSocialLoginData,
        ),
      )
    })
  })
  describe('authSocialRegistrationFlow', () => {
    it('should correctly handle being called', () => {
      // given ... the action is fired
      const create = createMiddlewareStub(jest)
      const mockSocialRegistration = jest.fn().mockResolvedValue(true)
      const action = authSocialRegistration('provider')
      // @ts-ignore
      const { invoke, next } = create(SUT.authSocialRegistrationFlow({ ssoAuth: mockSocialRegistration }))
      invoke(action)

      expect(next).toHaveBeenCalledWith(action)
    })
    it('should provide feedback on registration failure', () => {
      // given ... the action is fired
      const create = createMiddlewareStub(jest)
      const mockSocialRegistration = jest.fn().mockImplementation(() => {
        throw new Error('FAILURE')
      })
      const action = authSocialRegistration('provider')
      // @ts-ignore
      const { invoke, store } = create(SUT.authSocialRegistrationFlow({ ssoAuth: mockSocialRegistration }))
      invoke(action)

      expect(store.dispatch).toHaveBeenCalledWith(authSocialRegistrationFailure('FAILURE'))
    })
    it('should correctly get user data from the provider', () => {
      const create = createMiddlewareStub(jest)
      const mockSocialRegistration = jest.fn().mockResolvedValue(true)
      // given ... the action is fired
      const action = authSocialRegistration('provider')
      // @ts-ignore
      const { invoke } = create(SUT.authSocialRegistrationFlow({ ssoAuth: mockSocialRegistration }))
      invoke(action)

      expect(mockSocialRegistration).toHaveBeenCalled()
    })
  })
  describe('authSocialRegistrationSuccessFlow', () => {
    it('should correctly handle being called', () => {
      const create = createMiddlewareStub(jest)
      // given ... the action is fired
      const action = authSocialRegistrationSuccess(userSocialRegistrationData)
      // @ts-ignore
      const { invoke, next } = create(SUT.authSocialRegistrationSuccessFlow)
      invoke(action)

      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly register the user', () => {
      // given ... the action is fired
      const create = createMiddlewareStub(jest)
      const action = authSocialRegistrationSuccess(userSocialRegistrationData)
      // @ts-ignore
      const { invoke, store } = create(SUT.authSocialRegistrationSuccessFlow)
      invoke(action)

      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(ApiAuthConstants.REGISTER_SOCIAL_CONFIG, {
            isTokenRequired: false,
            onSuccess: authRegistrationSuccess,
            onFailure: authRegistrationFailure,
          }),
          userSocialRegistrationData,
        ),
      )
    })
  })
  describe('authLoginSuccessFlow', () => {
    it('should correctly catch a successful login action', () => {
      // given ... the authLoginSuccess action is fired
      const create = createMiddlewareStub(jest)
      const action = authLoginSuccess(defaultUserLoginResponseData)
      const mockNotification = jest.fn()
      // @ts-ignore
      const { store, invoke, next } = create(SUT.authLoginSuccessFlow({ notification: mockNotification }))

      // when ... we respond to the authLoginSuccess action
      invoke(action)

      // then ... we should correctly catch the action
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalled()
    })
    it('should correctly send a notification to the user', () => {
      // given ... the authLogin action is fired
      const create = createMiddlewareStub(jest)
      // @ts-ignore
      const action = authLoginSuccess(defaultUserLoginResponseData)
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.authLoginSuccessFlow({ notification: mockNotification }))

      // when ... we respond to the authLogin action
      invoke(action)

      // then ... the login API should be called
      expect(mockNotification).toHaveBeenCalled()
    })
    it('should extract and transmit auth credentials and refresh token', () => {
      // given ... the authLogin action is fired
      const create = createMiddlewareStub(jest)
      // @ts-ignore
      const action = authLoginSuccess(defaultUserLoginResponseData)
      const mockNotification = jest.fn()
      // @ts-ignores
      const { store, invoke } = create(SUT.authLoginSuccessFlow({ notification: mockNotification }))

      // when ... we respond to the authLogin action
      invoke(action)

      // then ... the login API should be called
      expect(store.dispatch).toHaveBeenCalledWith(setAuthCredentials({ token: 'USER_TOKEN', expiresAt: 'EXPIRY_DATE' }))
      expect(store.dispatch).toHaveBeenCalledWith(setSecureRefreshToken('REFRESH_TOKEN'))
      expect(store.dispatch).toHaveBeenCalledWith(AppActions.hydrateApp())
    })
  })
  describe('setSecureRefreshTokenFlow', () => {
    it('should correctly handle being called', () => {
      // given ... the authLoginSuccess action is fired
      const create = createMiddlewareStub(jest)
      const action = setSecureRefreshToken('REFRESH_TOKEN')
      const setSecureItemStub = jest.fn().mockResolvedValue(true)
      // @ts-ignore
      const { next, invoke } = create(SUT.setSecureRefreshTokenFlow(setSecureItemStub))

      // when ... we respond to the authLoginSuccess action
      invoke(action)

      // then ...
      // ... we should correctly attempt to store the token
      expect(setSecureItemStub).toHaveBeenCalled()
      // ... and should call next with the action
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly save the refresh token in secure store', async () => {
      // given ... the authLoginSuccess action is fired
      const create = createMiddlewareStub(jest)
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
      // given ... the authLoginSuccess action is fired
      const create = createMiddlewareStub(jest)
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
  describe('authLoginFailureFlow', () => {
    it('should correctly send a notification to the user', () => {
      // given ... the authLogin action is fired
      const create = createMiddlewareStub(jest)
      // @ts-ignore
      const response = 'ERROR: FAILED FOR A REASON'
      const action = authLoginFailure(response)
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.authLoginFailureFlow({ notification: mockNotification }))

      // when ... we respond to the authLogin action
      invoke(action)

      // then ... the login API should be called
      expect(mockNotification).toHaveBeenCalled()
    })
  })
  describe('authLogoutFlow', () => {
    it('should correctly logout the user', () => {
      // given ... the authLogout action is fired
      const create = createMiddlewareStub(jest)
      const action = authLogout()
      // @ts-ignore
      const { store, invoke } = create(SUT.authLogoutFlow)

      // when ... we respond to the authLogout action
      invoke(action)

      // then ... the reset APP should be called
      expect(store.dispatch).toHaveBeenCalledWith(resetAppData())
    })
  })
  describe('authRegistrationFlow', () => {
    it('should ignore other actions', () => {
      // given ... an action is fired
      const create = createMiddlewareStub(jest)
      const mockApi = jest.fn()
      const action = { type: 'TEST', payload: {} }
      // @ts-ignore
      const { invoke, next } = create(SUT.authRegistrationFlow)

      // when ... we invoke another action
      invoke(action)

      // then ... next should have been called with the action
      expect(next).toHaveBeenCalledWith(action)
      expect(mockApi).not.toHaveBeenCalled()
    })

    it('should correctly handle registration', () => {
      // given ... the authRegistration action is fired
      const create = createMiddlewareStub(jest)
      const action = authRegistration(userRegistrationData)
      // @ts-ignore
      const { invoke, next } = create(SUT.authRegistrationFlow)

      // when ... we respond to the authRegistration action
      invoke(action)

      // then ... the register API should be called
      expect(next).toHaveBeenCalledWith(action)
    })

    it('should correctly register a user', () => {
      // given ... the register api is called and returns successfully
      const create = createMiddlewareStub(jest)
      const action = authRegistration(userRegistrationData)

      // @ts-ignore
      const { store, invoke } = create(SUT.authRegistrationFlow)

      // when ... we respond to the successful state
      invoke(action)

      // then ... the success action should be dispatched with the response
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(ApiAuthConstants.REGISTER_CONFIG, {
            isTokenRequired: false,
            onSuccess: authRegistrationSuccess,
            onFailure: authRegistrationFailure,
          }),
          userRegistrationData,
        ),
      )
    })
  })
  describe('authRegistrationSuccessFlow', () => {
    it('should correctly send a notification to the user', () => {
      // middleware is dependent on a populated state
      const state = {
        auth: {
          ...INITIAL_STATE,
          email: 'EMAIL',
          password: 'PASSWORD',
        },
      }
      const create = createMiddlewareStub(jest, state)
      // @ts-ignore
      const response = defaultUserRegistrationResponseData
      const action = authRegistrationSuccess(response)
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.authRegistrationSuccessFlow({ notification: mockNotification }))

      invoke(action)

      // then ... the notification should be called
      expect(mockNotification).toHaveBeenCalled()
    })
  })
  describe('authRegistrationFailureFlow', () => {
    it('should correctly send a notification to the user', () => {
      // given ... the authRegistration action is fired
      const create = createMiddlewareStub(jest)
      // @ts-ignore
      const response = 'ERROR: FAILED FOR A REASON'
      const action = authRegistrationFailure(response)
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.authRegistrationFailureFlow({ notification: mockNotification }))

      // when ... we respond to the authRegistration action
      invoke(action)

      // then ... the notification should be called
      expect(mockNotification).toHaveBeenCalled()
    })
  })
  describe('authSocialLoginFailureFlow', () => {
    it('should correctly send a notification to the user', () => {
      // given ... the authRegistration action is fired
      const create = createMiddlewareStub(jest)
      // @ts-ignore
      const response = 'ERROR: FAILED FOR A REASON'
      const action = authSocialLoginFailure(response)
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.authSocialLoginFailureFlow({ notification: mockNotification }))

      // when ... we respond to the authRegistration action
      invoke(action)

      // then ... the notification should be called
      expect(mockNotification).toHaveBeenCalled()
    })
  })
  describe('authSocialRegistrationFailureFlow', () => {
    it('should correctly send a notification to the user', () => {
      // given ... the authRegistration action is fired
      const create = createMiddlewareStub(jest)
      // @ts-ignore
      const response = 'ERROR: FAILED FOR A REASON'
      const action = authSocialRegistrationFailure(response)
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.authSocialRegistrationFailureFlow({ notification: mockNotification }))

      // when ... we respond to the authRegistration action
      invoke(action)

      // then ... the notification should be called
      expect(mockNotification).toHaveBeenCalled()
    })
  })
})
