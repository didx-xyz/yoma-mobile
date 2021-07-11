import { authLoginSuccess } from 'modules/Auth/Auth.reducer'
import { defaultUserLoginResponseData } from 'modules/Auth/Auth.test.fixtures'
import { mergeRight } from 'ramda'
import { rootStateFixture } from 'redux/redux.test.fixtures'

import { createMiddlewareMock } from '../../../tests/tests.utils'
import { actions as ApiActions } from '../../api'
import { constants as ApiUserConstants } from '../../api/users'
import { USER_RESPONSE } from './../Profile/Profile.constants'
import * as SUT from './User.middleware'
import { setUser, updateUser, updateUserFailure, updateUserSuccess } from './User.reducer'
import { extractUserFromLoginPayload, extractUserFromUserUpdateSuccess } from './User.utils'

describe('modules/User/User.middleware', () => {
  it('should correctly handle being called', () => {
    const create = createMiddlewareMock(jest)
    const credentials = defaultUserLoginResponseData
    // given ... the authLogin action is fired
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
    const create = createMiddlewareMock(jest)
    const credentials = defaultUserLoginResponseData
    // given ... the authLogin action is fired
    const action = authLoginSuccess(credentials)
    // @ts-ignore
    const { invoke, store } = create(SUT.setUserOnAuthFlow)
    const userData = extractUserFromLoginPayload(action)

    // when ... we respond to the authLoginSuccess action
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

    const create = createMiddlewareMock(jest, mockState)
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
    const mockState = rootStateFixture({})

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
    expect(store.dispatch).toHaveBeenCalledWith(
      ApiActions.apiRequest(
        mergeRight(ApiUserConstants.USERS_EDIT_CONFIG, {
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
    const create = createMiddlewareMock(jest)
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
    const create = createMiddlewareMock(jest)
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
    const create = createMiddlewareMock(jest)
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
