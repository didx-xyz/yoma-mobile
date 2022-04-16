import { mergeRight } from 'ramda'
import RNAppAuth from 'react-native-app-auth'

import { createMiddlewareMock } from '~/../tests/tests.utils'
import { actions as ApiActions } from '~/api'
import { constants as ApiAuthConstants } from '~/api/auth'

import { actions as AppActions } from '../App'
import { actions as ErrorActions } from '../Error'
import * as SUT from './Auth.middleware'
import {
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
  setAuthCredentials,
  setSecureRefreshToken,
  setSecureRefreshTokenFailure,
  setSecureRefreshTokenSuccess,
} from './Auth.reducer'
import { defaultUserLoginResponseData } from './Auth.test.fixtures'

jest.mock('react-native-app-auth', () => ({
  authorize: jest.fn(),
}))

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
    it('should correctly handle being called and called the OAuth login', () => {
      // given ... the login action is fired
      const create = createMiddlewareMock(jest)
      const action = login()
      // @ts-ignore
      const { invoke, next } = create(SUT.loginFlow)

      // when ... we respond to the login action
      invoke(action)

      // then ... the OAuth API should be called
      expect(next).toHaveBeenCalledWith(action)
      expect(RNAppAuth.authorize).toHaveBeenCalled()
    })
    it('should correctly login the user in', () => {
      // given ... the login action is fired
      const create = createMiddlewareMock(jest)
      const action = login()
      // @ts-ignore
      const { invoke } = create(SUT.loginFlow)

      // when ... we respond to the login action
      invoke(action)

      // then ... the login API should be called
      expect(RNAppAuth.authorize).toHaveBeenCalled()
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
      const mockResponse = {
        token: 'TOKEN',
        expiresAt: 'EXPIRES_AT',
        idToken: 'ID_TOKEN',
        tokenType: 'TOKEN_TYPE',
        scopes: ['SCOPES'],
        tokenAdditionalParameters: { aKey: 'TOKEN_ADDITIONAL_PARAMETERS' },
        authorizeAdditionalParameters: { aKey: 'AUTHORIZE_ADDITIONAL_PARAMETERS' },
      }
      expect(store.dispatch).toHaveBeenCalledTimes(3)
      expect(store.dispatch).toHaveBeenCalledWith(setAuthCredentials(mockResponse))
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
