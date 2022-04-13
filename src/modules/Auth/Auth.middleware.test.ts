import { mergeRight } from 'ramda'

import { createMiddlewareMock } from '../../../tests/tests.utils'
import { actions as ApiActions } from '../../api'
import { constants as ApiAuthConstants } from '../../api/auth'
import { actions as AppActions } from '../App'
import { actions as ErrorActions } from '../Error'
import * as SUT from './Auth.middleware'
import {
  INITIAL_STATE,
  authSocialLogin,
  authSocialLoginFailure,
  authSocialLoginSuccess,
  authSocialRegistration,
  authSocialRegistrationFailure,
  authSocialRegistrationSuccess,
  authorize,
  authorizeWithRefreshTokenFailure,
  authorizeWithRefreshTokenSuccess,
  deleteSecureRefreshToken,
  deleteSecureRefreshTokenFailure,
  deleteSecureRefreshTokenSuccess,
  getSecureRefreshToken,
  getSecureRefreshTokenFailure,
  getSecureRefreshTokenSuccess,
  login,
  loginFailure,
  loginSuccess,
  logout,
  noRefreshTokenInSecureStore,
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
  userSocialLoginData,
  userSocialRegistrationData,
} from './Auth.test.fixtures'

describe('modules/Auth/Auth.middleware', () => {
  describe('authorizeFlow', () => {
    it('should start authorizing the user', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      // @ts-ignore
      const { invoke, next, store } = create(SUT.authorizeFlow)

      // when ... we need to authorize the user
      const action = authorize()
      invoke(action)

      // then ...
      // ...we should ensure next is called
      expect(next).toHaveBeenCalledWith(action)
      // ...we should check if there is a refresh token to authorize with
      expect(store.dispatch).toHaveBeenCalledWith(getSecureRefreshToken())
    })
  })
  describe('getSecureRefreshTokenFlow', () => {
    it('should correctly handle being called', async () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const action = getSecureRefreshToken()
      const getSecureItemStub = jest.fn().mockResolvedValue('SOME VALUE')
      // @ts-ignore
      const { invoke, next } = create(SUT.getSecureRefreshTokenFlow(getSecureItemStub))

      // when ... we want try retrieve the refresh token
      await invoke(action)

      // then ...
      // ... we should make sure that we pass the action on
      expect(next).toHaveBeenCalledWith(action)
      // ... we should try to retrieve the token
      expect(getSecureItemStub).toHaveBeenCalled()
    })
    it('should continue authorising if a refresh token is available', async () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const action = getSecureRefreshToken()

      // when ... try to successfully retrieve the refresh token
      const getSecureItemStub = jest.fn().mockResolvedValue('REFRESH TOKEN')
      // @ts-ignore
      const { invoke, store } = create(SUT.getSecureRefreshTokenFlow(getSecureItemStub))
      await invoke(action)
      // then ...we should send the refresh token as a payload
      expect(store.dispatch).toBeCalledWith(getSecureRefreshTokenSuccess('REFRESH TOKEN'))
    })
    it('should handle no refresh token', async () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const action = getSecureRefreshToken()

      // when ... try to retrieve the refresh token but there isn't one available
      const getSecureItemStub = jest.fn().mockResolvedValue(null)
      // @ts-ignore
      const { invoke, store } = create(SUT.getSecureRefreshTokenFlow(getSecureItemStub))
      await invoke(action)

      // then ...we should send an action notifying that there is no refresh token
      expect(store.dispatch).toBeCalledWith(noRefreshTokenInSecureStore())
    })
    it('should handle a failure while accessing the refresh token', async () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const action = getSecureRefreshToken()

      // when ... we fail while trying to retrieve the refresh token
      const getSecureItemStub = jest.fn().mockRejectedValue({ message: 'AN ERROR' })
      // @ts-ignore
      const { invoke, store } = create(SUT.getSecureRefreshTokenFlow(getSecureItemStub))
      await invoke(action)

      // then ...we should send an action notifying that there is no refresh token
      expect(store.dispatch).toBeCalledWith(getSecureRefreshTokenFailure('AN ERROR'))
    })
  })
  describe('authorizeWithRefreshTokenFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      // @ts-ignore - partial mocking for test only
      const create = createMiddlewareMock(jest, { user: { id: 'USER ID' } })
      const action = getSecureRefreshTokenSuccess('REFRESH TOKEN')
      // @ts-ignore
      const { invoke, next, store } = create(SUT.authorizeWithRefreshTokenFlow)

      // when ... we handle successfully retrieving the refresh token
      invoke(action)

      // then ...
      // ... we should make sure that we pass the action on
      expect(next).toHaveBeenCalledWith(action)
      // ... we should try to retrieve the token
      expect(store.dispatch).toHaveBeenCalled()
    })
    it('should correctly call the refresh token api', () => {
      // given ...
      // @ts-ignore - partial mocking for test only
      const create = createMiddlewareMock(jest, { user: { id: 'USER ID' } })
      const action = getSecureRefreshTokenSuccess('REFRESH TOKEN')
      // @ts-ignore
      const { invoke, store } = create(SUT.authorizeWithRefreshTokenFlow)

      // when ... we successfully get the refresh token
      invoke(action)

      // then ... we should attempt to login with the refresh token
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(ApiAuthConstants.SESSION_CONFIG, {
            onSuccess: authorizeWithRefreshTokenSuccess,
            onFailure: authorizeWithRefreshTokenFailure,
          }),
          { userId: 'USER ID', refreshToken: 'REFRESH TOKEN' },
        ),
      )
    })
    it('should handle an error getting the token', () => {
      //TODO: add error state test
    })
  })
  describe('authorizeWithRefreshTokenFailureFlow', () => {
    it.each([
      [authorizeWithRefreshTokenFailure('ERROR MESSAGE')],
      [noRefreshTokenInSecureStore()],
      [getSecureRefreshTokenFailure('ERROR MESSAGE')],
    ])('should correctly handle being called', action => {
      // given ...
      const create = createMiddlewareMock(jest)
      // @ts-ignore
      const { invoke, next, store } = create(SUT.authorizeWithRefreshTokenFailureFlow)

      // when ... we handle successfully retrieving the refresh token
      invoke(action)

      // then ...
      // ... we should make sure that we pass the action on
      expect(next).toHaveBeenCalledWith(action)
      // ... we should try to retrieve the token
      expect(store.dispatch).toHaveBeenCalled()
    })
    it.each([
      [authorizeWithRefreshTokenFailure('ERROR MESSAGE')],
      [noRefreshTokenInSecureStore()],
      [getSecureRefreshTokenFailure('ERROR MESSAGE')],
    ])('should correctly log the user out on failure', action => {
      // given ...
      const create = createMiddlewareMock(jest)
      // @ts-ignore
      const { invoke, store } = create(SUT.authorizeWithRefreshTokenFailureFlow)

      // when ... we experience any failure trying to authorize with a refresh token
      invoke(action)

      // then ... we should log the user out
      expect(store.dispatch).toHaveBeenCalledWith(logout())
    })
  })
  describe('loginFlow', () => {
    it('should correctly handle being called', () => {
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
      invoke(action)

      // then ... the login API should be called
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalled()
    })
    it('should correctly login the user in', () => {
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
      invoke(action)

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
  describe('authSocialLoginFlow', () => {
    it('should correctly handle being called', async () => {
      // given ... the action is fired
      const create = createMiddlewareMock(jest)
      const mockSocialLogin = jest.fn().mockResolvedValue(true)
      const action = authSocialLogin('provider')
      // @ts-ignore
      const { invoke, next } = create(SUT.authSocialLoginFlow({ ssoAuth: mockSocialLogin }))
      await invoke(action)

      expect(next).toHaveBeenCalledWith(action)
    })
    it('should provide feedback on login failure', async () => {
      // given ... the action is fired
      const create = createMiddlewareMock(jest)
      const mockSocialLogin = jest.fn().mockImplementation(() => {
        throw new Error('FAILURE')
      })
      const action = authSocialLogin('provider')
      // @ts-ignore
      const { store, invoke } = create(SUT.authSocialLoginFlow({ ssoAuth: mockSocialLogin }))
      await invoke(action)

      expect(store.dispatch).toHaveBeenCalledWith(authSocialLoginFailure('FAILURE'))
    })
    it('should correctly get user data from the provider', async () => {
      const create = createMiddlewareMock(jest)
      const mockNotification = jest.fn()
      const mockSocialLogin = jest.fn().mockResolvedValue(true)
      // given ... the action is fired
      const action = authSocialLogin('provider')
      // @ts-ignore
      const { invoke } = create(SUT.authSocialLoginFlow({ ssoAuth: mockSocialLogin, notification: mockNotification }))
      await invoke(action)

      expect(mockSocialLogin).toHaveBeenCalled()
    })
  })
  describe('authSocialLoginSuccessFlow', () => {
    it('should correctly handle being called', () => {
      const create = createMiddlewareMock(jest)
      // given ... the action is fired
      const action = authSocialLoginSuccess(userSocialRegistrationData)
      // @ts-ignore
      const { invoke, next } = create(SUT.authSocialLoginSuccessFlow)
      invoke(action)

      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly login the user', () => {
      // given ... the action is fired
      const create = createMiddlewareMock(jest)
      const action = authSocialLoginSuccess(userSocialLoginData)
      // @ts-ignore
      const { invoke, store } = create(SUT.authSocialLoginSuccessFlow)
      invoke(action)

      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(ApiAuthConstants.LOGIN_SOCIAL_CONFIG, {
            onSuccess: loginSuccess,
            onFailure: loginFailure,
          }),
          userSocialLoginData,
        ),
      )
    })
  })
  describe('authSocialLoginFailureFlow', () => {
    it('should correctly send a notification to the user', () => {
      // given ... the authRegistration action is fired
      const create = createMiddlewareMock(jest)
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
  describe('authSocialRegistrationFlow', () => {
    it('should correctly handle being called', async () => {
      // given ... the action is fired
      const create = createMiddlewareMock(jest)
      const mockSocialRegistration = jest.fn().mockResolvedValue(true)
      const action = authSocialRegistration('provider')
      // @ts-ignore
      const { invoke, next } = create(SUT.authSocialRegistrationFlow({ ssoAuth: mockSocialRegistration }))
      await invoke(action)

      expect(next).toHaveBeenCalledWith(action)
    })
    it('should provide feedback on registration failure', async () => {
      // given ... the action is fired
      const create = createMiddlewareMock(jest)
      const mockSocialRegistration = jest.fn().mockImplementation(() => {
        throw new Error('FAILURE')
      })
      const action = authSocialRegistration('provider')
      // @ts-ignore
      const { invoke, store } = create(SUT.authSocialRegistrationFlow({ ssoAuth: mockSocialRegistration }))
      await invoke(action)

      expect(store.dispatch).toHaveBeenCalledWith(authSocialRegistrationFailure('FAILURE'))
    })
    it('should correctly get user data from the provider', async () => {
      const create = createMiddlewareMock(jest)
      const mockSocialRegistration = jest.fn().mockResolvedValue(true)
      // given ... the action is fired
      const action = authSocialRegistration('provider')
      // @ts-ignore
      const { invoke } = create(SUT.authSocialRegistrationFlow({ ssoAuth: mockSocialRegistration }))
      await invoke(action)

      expect(mockSocialRegistration).toHaveBeenCalled()
    })
  })
  describe('authSocialRegistrationSuccessFlow', () => {
    it('should correctly handle being called', () => {
      const create = createMiddlewareMock(jest)
      // given ... the action is fired
      const action = authSocialRegistrationSuccess(userSocialRegistrationData)
      // @ts-ignore
      const { invoke, next } = create(SUT.authSocialRegistrationSuccessFlow)
      invoke(action)

      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly register the user', () => {
      // given ... the action is fired
      const create = createMiddlewareMock(jest)
      const action = authSocialRegistrationSuccess(userSocialRegistrationData)
      // @ts-ignore
      const { invoke, store } = create(SUT.authSocialRegistrationSuccessFlow)
      invoke(action)

      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(ApiAuthConstants.REGISTER_SOCIAL_CONFIG, {
            isTokenRequired: false,
            onSuccess: registerSuccess,
            onFailure: registerFailure,
          }),
          userSocialRegistrationData,
        ),
      )
    })
  })
  describe('authSocialRegistrationFailureFlow', () => {
    it('should correctly send a notification to the user', () => {
      // given ... the authRegistration action is fired
      const create = createMiddlewareMock(jest)
      // @ts-ignore
      const response = 'ERROR: FAILED FOR A REASON'
      const action = authSocialRegistrationFailure(response)
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.authSocialRegistrationFailureFlow({ notification: mockNotification }))

      // when ... we respond to the register action
      invoke(action)

      // then ... the notification should be called
      expect(mockNotification).toHaveBeenCalled()
    })
  })
  describe('authorizeSuccessFlow', () => {
    it('should correctly catch a successful login action', () => {
      // given ... the loginSuccess action is fired
      const create = createMiddlewareMock(jest)
      const action = loginSuccess(defaultUserLoginResponseData)
      // @ts-ignore
      const { store, invoke, next } = create(SUT.authorizeSuccessFlow)

      // when ... we respond to the loginSuccess action
      invoke(action)

      // then ... we should correctly catch the action
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalled()
    })
    it('should extract and transmit auth credentials and refresh token', () => {
      // given ... the login action is fired
      const create = createMiddlewareMock(jest)
      // @ts-ignore
      const action = loginSuccess(defaultUserLoginResponseData)
      // @ts-ignores
      const { store, invoke } = create(SUT.authorizeSuccessFlow)

      // when ... we respond to the login action
      invoke(action)

      // then ... the login API should be called
      expect(store.dispatch).toHaveBeenCalledWith(
        setAuthCredentials({
          token: 'USER_TOKEN',
          expiresAt: 'EXPIRY_DATE',
        }),
      )
      expect(store.dispatch).toHaveBeenCalledWith(setSecureRefreshToken('REFRESH_TOKEN'))
      expect(store.dispatch).toHaveBeenCalledWith(AppActions.hydrateApp())
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
    it('should correctly send a notification to the user', () => {
      // given ... the login action is fired
      const create = createMiddlewareMock(jest)
      // @ts-ignore
      const response = 'ERROR: FAILED FOR A REASON'
      const action = loginFailure(response)
      const mockNotification = jest.fn()

      // when ... we respond to the login action
      // @ts-ignore
      const { invoke } = create(SUT.loginFailureFlow({ notification: mockNotification }))

      invoke(action)

      // then ... the login API should be called
      expect(mockNotification).toHaveBeenCalled()
    })
  })
  describe('logoutFlow', () => {
    it('should correctly logout the user', () => {
      // given ... the logout action is fired
      const create = createMiddlewareMock(jest)
      const action = logout()
      // @ts-ignore
      const { store, invoke } = create(SUT.logoutFlow)

      // when ... we respond to the logout action
      invoke(action)

      // then ... the reset APP should be called
      expect(store.dispatch).toHaveBeenCalledWith(AppActions.resetAppData())
    })
  })
  describe('deleteSecureRefreshTokenFlow', () => {
    it('should correctly delete the refresh token and handle being called', async () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const action = deleteSecureRefreshToken()
      const deleteSecureItemStub = jest.fn().mockResolvedValue('SOME VALUE')
      // @ts-ignore
      const { invoke, next, store } = create(SUT.deleteSecureRefreshTokenFlow(deleteSecureItemStub))

      // when ... we delete the refresh token
      await invoke(action)

      // then ...
      // ... we should make sure that we pass the action
      expect(next).toHaveBeenCalledWith(action)
      // ... we should try to retrieve the token
      expect(store.dispatch).toHaveBeenCalledWith(deleteSecureRefreshTokenSuccess())
    })
    it('should handle failing to delete the refresh token', async () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const action = deleteSecureRefreshToken()
      const deleteSecureItemStub = jest.fn().mockRejectedValue('SOME ERROR')
      // @ts-ignore
      const { invoke, store } = create(SUT.deleteSecureRefreshTokenFlow(deleteSecureItemStub))

      // when ... we fail to delete the refresh token
      await invoke(action)

      // then .... we should try to retrieve the token
      expect(store.dispatch).toHaveBeenCalledWith(deleteSecureRefreshTokenFailure('SOME ERROR'))
    })
  })
  describe('registrationFlow', () => {
    it('should ignore other actions', () => {
      // given ... an action is fired
      const create = createMiddlewareMock(jest)
      const mockApi = jest.fn()
      const action = { type: 'TEST', payload: {} }
      // @ts-ignore
      const { invoke, next } = create(SUT.registrationFlow)

      // when ... we invoke another action
      invoke(action)

      // then ... next should have been called with the action
      expect(next).toHaveBeenCalledWith(action)
      expect(mockApi).not.toHaveBeenCalled()
    })
    it('should correctly handle registration', () => {
      // given ... the register action is fired
      const create = createMiddlewareMock(jest)
      const action = register(userRegistrationData)
      // @ts-ignore
      const { invoke, next } = create(SUT.registrationFlow)

      // when ... we respond to the register action
      invoke(action)

      // then ... the register API should be called
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly register a user', () => {
      // given ... the register api is called and returns successfully
      const create = createMiddlewareMock(jest)
      const action = register(userRegistrationData)

      // @ts-ignore
      const { store, invoke } = create(SUT.registrationFlow)

      // when ... we respond to the successful state
      invoke(action)

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
  describe('registrationSuccessFlow', () => {
    it('should correctly send a notification to the user', () => {
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
      const action = registerSuccess(defaultUserRegistrationResponseData)
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.registrationSuccessFlow({ notification: mockNotification }))

      invoke(action)

      // then ... the notification should be called
      expect(mockNotification).toHaveBeenCalled()
    })
  })
  describe('registrationFailureFlow', () => {
    it('should correctly send a notification to the user', () => {
      // given ... the register action is fired
      const create = createMiddlewareMock(jest)
      // @ts-ignore
      const response = 'ERROR: FAILED FOR A REASON'
      // @ts-ignore
      const action = registerFailure(response)
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.registrationFailureFlow({ notification: mockNotification }))

      // when ... we respond to the authRegistration action
      invoke(action)

      // then ... the notification should be called
      expect(mockNotification).toHaveBeenCalled()
    })
  })
  describe('unauthorizedFlow', () => {
    it('should authorize the user if the user is un-authed', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const action = ErrorActions.unauthorizedError()

      // when ... the user is unauthorized
      // @ts-ignore
      const { invoke, next, store } = create(SUT.unauthorizedFlow)
      invoke(action)

      // then ...
      // ... we should correctly pass the action on
      expect(next).toHaveBeenCalledWith(action)
      // ... we should re-authorize the user
      expect(store.dispatch).toHaveBeenCalledWith(authorize())
    })
  })
})
