import { loginSuccess } from 'modules/Auth/Auth.reducer'
import { defaultUserLoginResponseData } from 'modules/Auth/Auth.test.fixtures'
import { setJobEntities } from 'modules/Job/Job.reducer'
import { mergeRight } from 'ramda'
import { rootStateFixture } from 'redux/redux.test.fixtures'

import { createMiddlewareStub } from '../../../tests/tests.utils'
import { actions as ApiActions, utils as ApiUtils } from '../../api'
import { constants as ApiUsersConstants } from '../../api/users'
import { UserCredentialTypes } from './../../api/users/users.types'
import * as SUT from './User.middleware'
import {
  fetchUserCredentials,
  fetchUserCredentialsFailure,
  fetchUserCredentialsSuccess,
  setUser,
  updateUser,
  updateUserFailure,
  updateUserPhotoFailure,
  updateUserPhotoSuccess,
  updateUserSuccess,
  uploadUserPhoto,
  uploadUserPhotoFailure,
  uploadUserPhotoSuccess,
} from './User.reducer'
import { USER_RESPONSE } from './User.test.fixtures'
import {
  extractUserCredentialsByType,
  extractUserFromLoginPayload,
  extractUserFromUserUpdateSuccess,
} from './User.utils'

describe('modules/User/User.middleware', () => {
  describe('setUserOnAuthFlow', () => {
    it('should correctly handle being called', () => {
      // given ... the authLogin action is fired
      const create = createMiddlewareStub(jest)
      const user = defaultUserLoginResponseData
      const action = loginSuccess(user)

      // when ... we respond to the loginSuccess action
      // @ts-ignore
      const { store, invoke, next } = create(SUT.setUserOnAuthFlow)

      invoke(action)

      // then ...validate setUserOnAuthFlow
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalled()
    })
    it('should correctly set the user data', () => {
      // given ... the authLogin action is fired
      const create = createMiddlewareStub(jest)
      const user = defaultUserLoginResponseData
      const action = loginSuccess(user)
      // @ts-ignore

      // when ... we respond to the loginSuccess action
      const { invoke, store } = create(SUT.setUserOnAuthFlow)
      const userData = extractUserFromLoginPayload(action)
      invoke(action)

      // then ... setUser should be called
      expect(store.dispatch).toHaveBeenCalledWith(setUser(userData))
    })
  })
  describe('updateUserFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const mockState = rootStateFixture({})

      const mockAction = {
        payload: {
          biography: 'BIOGRAPHY',
        },
      }

      const create = createMiddlewareStub(jest, mockState)
      const action = updateUser(mockAction.payload)
      // @ts-ignore
      const { invoke, next } = create(SUT.updateUserFlow)

      // when ... we respond to the updateUser action
      invoke(action)

      // then ...validate updateUserFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly handle updating the user data', () => {
      // given ...
      const mockState = rootStateFixture({
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
      })

      const mockAction = {
        payload: {
          biography: 'BIOGRAPHY',
        },
      }

      const create = createMiddlewareStub(jest, mockState)
      const action = updateUser(mockAction.payload)
      // @ts-ignore
      const { invoke, store } = create(SUT.updateUserFlow)
      // when ... we respond to the updateUser action
      invoke(action)

      // then ...validate updateUserFlow
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(ApiUsersConstants.USERS_EDIT_CONFIG, {
            onSuccess: updateUserSuccess,
            onFailure: updateUserFailure,
            endpoint: 'USER_ID',
          }),
          mockAction.payload,
        ),
      )
    })
  })
  describe('updateUserSuccessFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const mockResponseData = {
        data: USER_RESPONSE,
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }

      const mockNotification = jest.fn()
      const action = updateUserSuccess(mockResponseData)
      // @ts-ignore
      const { invoke, next } = create(SUT.updateUserSuccessFlow({ notification: mockNotification }))
      // when ... we respond to the updateUserSuccess action
      invoke(action)
      // then ...validate updateUserSuccessFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly set user data on successful update', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const mockResponseData = {
        data: USER_RESPONSE,
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }

      const mockNotification = jest.fn()
      const action = updateUserSuccess(mockResponseData)
      // @ts-ignore
      const { store, invoke } = create(SUT.updateUserSuccessFlow({ notification: mockNotification }))
      // when ... we respond to the updateUserSuccess action
      invoke(action)
      // then ...validate setUser
      const user = extractUserFromUserUpdateSuccess(action)
      expect(store.dispatch).toHaveBeenCalledWith(setUser(user))
    })
    it('should correctly send notification to the user ', () => {
      // given ...
      //TODO: add test case for navigation
      const create = createMiddlewareStub(jest)
      const mockResponseData = {
        data: USER_RESPONSE,
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }

      const mockNotification = jest.fn()
      const action = updateUserSuccess(mockResponseData)
      // @ts-ignore
      const { invoke } = create(SUT.updateUserSuccessFlow({ notification: mockNotification }))
      // when ... we respond to the updateUserSuccess action
      invoke(action)
      // then ...validate mockNotification
      expect(mockNotification).toHaveBeenCalled()
    })
  })
  describe('updateUserFailureFlow', () => {
    it('should correctly handle user update failure', () => {
      // given ...
      const create = createMiddlewareStub(jest)
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
  describe('uploadUserPhotoFlow', () => {
    it('should correctly handle being called', async () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const imagePickerStub = {
        openCamera: () => jest.fn(),
      }
      const createPayloadStub = jest.fn()
      const action = uploadUserPhoto()
      // @ts-ignore
      // when ... we get a request for a user photo to be uploaded
      const { invoke, next, store } = create(
        SUT.uploadUserPhotoFlow({
          imagePicker: imagePickerStub,
          createPayload: createPayloadStub,
        }),
      )

      await invoke(action)

      // then ...we should respond correctly
      expect(store.dispatch).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly upload user profile photo', async () => {
      const create = createMiddlewareStub(jest)
      const imagePickerStub = {
        openCamera: () => jest.fn(),
      }
      const createPayloadStub = jest.fn(() => 'PHOTO_PAYLOAD_RESPONSE')
      const action = uploadUserPhoto()

      // when ... we successfully upload a users photo
      const { invoke, store } = create(
        SUT.uploadUserPhotoFlow({
          imagePicker: imagePickerStub,
          createPayload: createPayloadStub,
        }),
      )

      await invoke(action)

      // then ... we should successfully upload the user image
      expect(store.dispatch).toHaveBeenCalledWith(uploadUserPhotoSuccess('PHOTO_PAYLOAD_RESPONSE'))
    })
    it('should correctly handle any failure', async () => {
      const create = createMiddlewareStub(jest)
      const imagePickerStub = {
        openCamera: () => jest.fn(),
      }
      const createPayloadStub = jest.fn(() => {
        throw 'SOME ERROR'
      })
      const action = uploadUserPhoto()

      // when ... we fail to upload the user
      const { invoke, store } = create(
        SUT.uploadUserPhotoFlow({
          imagePicker: imagePickerStub,
          createPayload: createPayloadStub,
        }),
      )

      await invoke(action)

      // then ... we should successfully upload the user image
      expect(store.dispatch).toHaveBeenCalledWith(uploadUserPhotoFailure('SOME ERROR'))
    })
  })
  describe('uploadUserPhotoSuccessFlow', () => {
    it('should correctly handle being called', () => {
      const userId = 'USER ID'
      const create = createMiddlewareStub(jest, { user: { id: userId } })

      // given ... the uploadUserPhotoSuccess action is fired
      const action = uploadUserPhotoSuccess('PAYLOAD')
      // @ts-ignore
      const { invoke, next, store } = create(SUT.uploadUserPhotoSuccessFlow)

      // when ... we respond to the uploadUserPhotoSuccess action
      invoke(action)
      // then ...validate uploadUserPhotoSuccessFlow
      expect(store.dispatch).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly upload user profile photo', () => {
      const userId = 'USER ID'
      const create = createMiddlewareStub(jest, { user: { id: userId } })

      // given ... the uploadUserPhotoSuccess action is fired
      const action = uploadUserPhotoSuccess('PAYLOAD')
      // @ts-ignore
      const { invoke, store } = create(SUT.uploadUserPhotoSuccessFlow)
      // when ... we respond to the uploadUserPhotoSuccess action
      invoke(action)

      // then ...   call update user photo API
      const config = ApiUtils.prependIdToEndpointInConfig(ApiUsersConstants.USERS_PHOTO_CREATE_CONFIG)('USER ID')
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: updateUserPhotoSuccess,
            onFailure: updateUserPhotoFailure,
          }),
          action.payload,
        ),
      )
    })
  })
  describe('uploadUserPhotoFailureFlow', () => {
    it('should correctly handle user photo upload failure', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const action = uploadUserPhotoFailure('FAILED')
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.uploadUserPhotoFailureFlow({ notification: mockNotification }))

      // when ... we respond to the uploadUserPhotoFailure action
      invoke(action)

      // then ...validate failure
      expect(mockNotification).toHaveBeenCalled()
    })
  })
  describe('updateUserPhotoSuccessFlow', () => {
    it('should correctly handle user photo update failure', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const action = updateUserPhotoSuccess()
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.updateUserPhotoSuccessFlow({ notification: mockNotification }))

      // when ... we respond to the updateUserPhotoSuccess action
      invoke(action)

      // then ...validate updateUserPhotoSuccessFlow
      expect(mockNotification).toHaveBeenCalled()
    })
  })
  describe('updateUserPhotoFailureFlow', () => {
    it('should correctly handle user photo update failure', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const action = updateUserPhotoFailure('FAILED')
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.updateUserPhotoFailureFlow({ notification: mockNotification }))

      // when ... we respond to the updateUserPhotoFailureFlow action
      invoke(action)

      // then ...validate failure
      expect(mockNotification).toHaveBeenCalled()
    })
  })
  describe('fetchUserCredentialsFlow', () => {
    it('should correctly handle being called', () => {
      // given ... a user object with an id in state
      const userId = 'A USER ID'
      const create = createMiddlewareStub(jest, { user: { id: userId } })
      const config = ApiUtils.prependIdToEndpointInConfig(ApiUsersConstants.USERS_CREDENTIALS_GET_BY_ID_CONFIG)(userId)

      // when ... we request to get all the user's credentials
      const action = fetchUserCredentials()
      // @ts-ignore
      const { store, invoke, next } = create(SUT.fetchUserCredentialsFlow)
      invoke(action)

      // then ...
      // ... we should ensure the action continues onto next
      expect(next).toHaveBeenCalledWith(action)

      // ... we should fetch the users credentials
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: fetchUserCredentialsSuccess,
            onFailure: fetchUserCredentialsFailure,
          }),
          action.payload,
        ),
      )
    })
  })
  describe('fetchUserCredentialsSuccessFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const mockResponseData = [
        {
          job: 'JOB DATA 1',
          id: 'CREDENTIAL_ID',
        },
      ]

      const action = fetchUserCredentialsSuccess(mockResponseData)
      // @ts-ignore
      const { invoke, next } = create(SUT.fetchUserCredentialsSuccessFlow)
      // when ... we respond to the fetchUserCredentialsSuccess action
      invoke(action)
      // then ...validate fetchUserCredentialsSuccessFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly set user credentials on successful fetch', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const mockResponseData = {
        data: [
          {
            job: 'JOB DATA 1',
            id: 'CREDENTIAL_ID',
          },
        ],
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }

      const action = fetchUserCredentialsSuccess(mockResponseData)
      // @ts-ignore
      const { store, invoke } = create(SUT.fetchUserCredentialsSuccessFlow)
      // when ... we respond to the fetchUserCredentialsSuccess action
      invoke(action)
      // then ...validate fetchUserCredentialsSuccessFlow
      const jobs = extractUserCredentialsByType(UserCredentialTypes.Job)(action)
      expect(store.dispatch).toHaveBeenCalledWith(setJobEntities(jobs))
    })
  })
  describe('fetchUserCredentialsFailureFlow', () => {
    it('should correctly handle user credentials fetch failure', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const action = fetchUserCredentialsFailure('FAILED')
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.fetchUserCredentialsFailureFlow({ notification: mockNotification }))

      // when ... we respond to the fetchUserCredentialsFailures action
      invoke(action)

      // then ...validate failure
      expect(mockNotification).toHaveBeenCalled()
    })
  })
})
