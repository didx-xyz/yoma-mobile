import { addIdBeforeEndpointInConfig } from 'api/api.utils'
import { authLoginSuccess } from 'modules/Auth/Auth.reducer'
import { defaultUserLoginResponseData } from 'modules/Auth/Auth.test.fixtures'
import { mergeRight } from 'ramda'

import { createMiddlewareMock } from '../../../tests/tests.utils'
import { actions as ApiActions } from '../../api'
import { constants as ApiUserConstants } from '../../api/users'
import * as SUT from './User.middleware'
import {
  setUserData,
  updateUserCredentials,
  updateUserCredentialsFailure,
  updateUserCredentialsSuccess,
} from './User.reducer'
import { selectUserUpdateCredentials } from './User.selector'
import { selectUserCredentialsFromLoginPayload, selectUserIdFromUserCredentials } from './User.utils'

describe('modules/User/User.middleware', () => {
  describe('setUserOnAuthFlow', () => {
    it('should correctly handle being called', async () => {
      // given ... the authLogin action is fired
      const create = createMiddlewareMock(jest)
      const credentials = defaultUserLoginResponseData
      const action = authLoginSuccess(credentials)
      // @ts-ignore
      const { invoke, next } = create(SUT.setUserOnAuthFlow)

      // when ... we respond to the authLoginSuccess action
      await invoke(action)

      // then ...validate setUserOnAuthFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly set the user data', async () => {
      // given ... the authLogin action is fired
      const create = createMiddlewareMock(jest)
      const credentials = defaultUserLoginResponseData
      const action = authLoginSuccess(credentials)
      // @ts-ignore
      const { invoke, store } = create(SUT.setUserOnAuthFlow)
      const userData = selectUserCredentialsFromLoginPayload(action)

      // when ... we respond to the authLoginSuccess action
      await invoke(action)

      // then ... setUserData should be called
      expect(store.dispatch).toHaveBeenCalledWith(setUserData(userData))
    })
  })
  describe('updateUserCredentialsFlow', () => {
    it('should correctly handle being called', async () => {
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
      const create = createMiddlewareMock(jest, mockState)
      const updateCredentials = {
        biography: 'BIOGRAPHY',
      }
      const mockAction = {
        payload: updateCredentials,
      }
      const action = updateUserCredentials(updateCredentials)
      // @ts-ignore
      const { invoke, store } = create(SUT.updateUserCredentialsFlow)

      // when ... we respond to the updateUserCredentials action
      await invoke(action)

      // then ...validate updateUserCredentialsFlow
      const userId = selectUserIdFromUserCredentials(mockState)
      const userUpdateCredentials = selectUserUpdateCredentials(mockAction)(mockState)
      const USERS_EDIT_CONFIG = addIdBeforeEndpointInConfig(ApiUserConstants.USERS_EDIT_CONFIG)(userId)
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(USERS_EDIT_CONFIG, {
            onSuccess: updateUserCredentialsSuccess,
            onFailure: updateUserCredentialsFailure,
          }),
          userUpdateCredentials,
        ),
      )
    })
  })
  describe('updateUserCredentialsSuccessFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const credentials = {
        data: {
          data: {
            refreshToken: 'REFRESH_TOKEN',
            token: 'USER_TOKEN',
            expiresAt: 'EXPIRY_DATE',
            user: {
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
          },
        },
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }

      const mockNotification = jest.fn()
      const action = updateUserCredentialsSuccess(credentials)
      // @ts-ignore
      const { store, invoke, next } = create(SUT.updateUserCredentialsSuccessFlow({ notification: mockNotification }))
      // when ... we respond to the updateUserCredentialsSuccess action
      invoke(action)
      // then ...validate updateUserCredentialsSuccessFlow
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalledWith(
        setUserData({
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
        }),
      )
      expect(mockNotification).toHaveBeenCalled()
    })
  })
  describe('updateUserCredentialsFailureFlow', () => {
    it('should correctly handle user update failure', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const action = updateUserCredentialsFailure('FAILED')
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.updateUserCredentialsFailureFlow({ notification: mockNotification }))

      // when ... we respond to the authLoginSuccess action
      invoke(action)

      // then ...validate failure
      expect(mockNotification).toHaveBeenCalled()
    })
  })
})
