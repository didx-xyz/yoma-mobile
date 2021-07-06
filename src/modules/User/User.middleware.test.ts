import { authLoginSuccess } from 'modules/Auth/Auth.reducer'
import { defaultUserLoginResponseData } from 'modules/Auth/Auth.test.fixtures'
import { mergeRight } from 'ramda'

import { createMiddlewareMock } from '../../../tests/tests.utils'
import { actions as ApiActions } from '../../api'
import { constants as ApiUserConstants } from '../../api/users'
import * as SUT from './User.middleware'
import { setUser, updateUser, updateUserFailure, updateUserSuccess } from './User.reducer'
import { extractUser, selectUserFromLoginPayload, selectUserFromUpdatePayload } from './User.utils'

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
  describe('updateUserFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const mockState = {
        user: {
          id: 'USER_ID',
          firstName: 'FIRST_NAME',
          lastName: 'LAST_NAME',
          phoneNumber: 'PHONE_NUMBER',
          biography: '',
          countryAlpha2: 'COUNTRY_ALPHA2',
          email: 'USER_EMAIL@SOMEWHERE.TEST',
          zltoWalletId: 'ZLTO_WALLET_ID',
          zltoBalance: 1000,
          covidChallengeCertificateURL: 'COVID_CHALLENGE_CERTIFICATE_URL',
          tideChallengeCertificateURL: 'TIDE_CHALLENGE_CERTIFICATE_URL',
          photoURL: 'PHOTO_URL',
          role: 'ROLE',
          organisation: 'ORGANISATION',
          createdAt: 'CREATED_AT',
          lastLogin: 'LAST_LOGIN',
        },
      }

      const mockAction = {
        payload: {
          biography: 'BIOGRAPHY',
        },
      }

      const create = createMiddlewareMock(jest, mockState)
      const action = updateUser(mockAction.payload)
      // @ts-ignore
      const { invoke, store } = create(SUT.updateUserFlow)

      // when ... we respond to the updateUser action
      invoke(action)

      // then ...validate updateUserFlow
      const user = extractUser(mockAction.payload)(mockState)

      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(ApiUserConstants.USERS_EDIT_CONFIG, {
            onSuccess: updateUserSuccess,
            onFailure: updateUserFailure,
            endpoint: 'USER_ID',
          }),
          user,
        ),
      )
    })
  })
  describe('updateUserSuccessFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const mockResponseData = {
        data: {
          id: 'USER_ID',
          firstName: 'FIRST_NAME',
          lastName: 'LAST_NAME',
          phoneNumber: 'PHONE_NUMBER',
          biography: 'BIOGRAPHY',
          countryAlpha2: 'COUNTRY_ALPHA2',
          email: 'USER_EMAIL@SOMEWHERE.TEST',
          zltoWalletId: 'ZLTO_WALLET_ID',
          zltoBalance: 1000,
          covidChallengeCertificateURL: 'COVID_CHALLENGE_CERTIFICATE_URL',
          tideChallengeCertificateURL: 'TIDE_CHALLENGE_CERTIFICATE_URL',
          photoURL: 'PHOTO_URL',
          role: 'ROLE',
          organisation: 'ORGANISATION',
          createdAt: 'CREATED_AT',
          lastLogin: 'LAST_LOGIN',
        },
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }

      const mockNotification = jest.fn()
      const action = updateUserSuccess(mockResponseData)
      // @ts-ignore
      const { store, invoke, next } = create(SUT.updateUserSuccessFlow({ notification: mockNotification }))
      // when ... we respond to the updateUserSuccess action
      invoke(action)
      // then ...validate updateUserSuccessFlow
      const credentials = selectUserFromUpdatePayload(action)
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalledWith(setUser(credentials))
      expect(mockNotification).toHaveBeenCalled()
    })
  })
  describe('updateUserFailureFlow', () => {
    it('should correctly handle user update failure', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const action = updateUserFailure('FAILED')
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.updateUserFailureFlow({ notification: mockNotification }))

      // when ... we respond to the authLoginSuccess action
      invoke(action)

      // then ...validate failure
      expect(mockNotification).toHaveBeenCalled()
    })
  })
})
