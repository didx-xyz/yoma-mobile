import { HomeNavigationRoutes } from 'modules/HomeNavigation/HomeNavigation.types'
import { CAPTURE_IMAGE_OPTIONS } from 'modules/User/User.constants'
import { mergeRight } from 'ramda'
import { Middleware } from 'redux'
import { showSimpleMessage } from 'utils/error'

import { actions as ApiActions, utils as ApiUtils } from '../../api'
import { constants as ApiUsersConstants } from '../../api/users'
import { loginSuccess } from '../Auth/Auth.reducer'
import * as Navigation from '../Navigation/Navigation.actions'
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
import { selectId } from './User.selector'
import { UploadUserPhotoFlowDependencies } from './User.types'
import {
  extractUserFromLoginPayload,
  extractUserFromUpdateUserPayload,
  extractUserFromUserUpdateSuccess,
} from './User.utils'

export const setUserOnAuthFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (loginSuccess.match(action)) {
      const user = extractUserFromLoginPayload(action)
      dispatch(setUser(user))
    }
    return result
  }

export const updateUserFlow: Middleware =
  ({ getState, dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (updateUser.match(action)) {
      const state = getState()
      const patchPayload = extractUserFromUpdateUserPayload(action.payload)
      const userId = selectId(state)

      dispatch(
        ApiActions.apiRequest(
          mergeRight(ApiUsersConstants.USERS_EDIT_CONFIG, {
            onSuccess: updateUserSuccess,
            onFailure: updateUserFailure,
            endpoint: userId,
          }),
          patchPayload,
        ),
      )
    }
    return result
  }

export const fetchUserCredentialsFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (fetchUserCredentialsFailure.match(action)) {
      // TODO: this should be handled by the notification module
      notification('danger', 'An error occurred.', 'Oops something went wrong! Please try again.')
    }
    return result
  }

export const updateUserSuccessFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (updateUserSuccess.match(action)) {
      const user = extractUserFromUserUpdateSuccess(action)
      dispatch(setUser(user))
      //TODO: add navigation as a dependency
      Navigation.navigate(HomeNavigationRoutes.Home)
      // TODO: this should be handled by the notification module
      notification('success', 'Details Updated')
    }
    return result
  }

export const updateUserFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (updateUserFailure.match(action)) {
      // TODO: this should be handled by the notification module
      notification('danger', 'An error occurred.', 'Oops something went wrong! Please try again.')
    }
    return result
  }

export const uploadUserPhotoFlow =
  ({ imagePicker, createPayload }: UploadUserPhotoFlowDependencies): Middleware =>
  ({ dispatch }) =>
  next =>
  async action => {
    const result = next(action)
    if (uploadUserPhoto.match(action)) {
      try {
        const imageData = await imagePicker.openCamera(CAPTURE_IMAGE_OPTIONS)
        const photoPayload = createPayload(imageData)
        dispatch(uploadUserPhotoSuccess(photoPayload))
      } catch (error) {
        dispatch(uploadUserPhotoFailure(error))
      }
    }
    return result
  }

export const uploadUserPhotoSuccessFlow: Middleware =
  ({ getState, dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (uploadUserPhotoSuccess.match(action)) {
      const state = getState()
      const userId = selectId(state)
      const config = ApiUtils.prependIdToEndpointInConfig(ApiUsersConstants.USERS_PHOTO_CREATE_CONFIG)(userId)
      dispatch(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: updateUserPhotoSuccess,
            onFailure: updateUserPhotoFailure,
          }),
          action.payload,
        ),
      )
    }
    return result
  }

export const updateUserPhotoSuccessFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (updateUserPhotoSuccess.match(action)) {
      const user = extractUserFromUserUpdateSuccess(action)
      dispatch(setUser(user))
      // TODO: this should be handled by the notification module
      notification('success', 'Details Updated')
    }
    return result
  }
export const uploadUserPhotoFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (uploadUserPhotoFailure.match(action)) {
      // TODO: this should be handled by the notification module
      notification('danger', 'An error occurred.', action.payload)
    }
    return result
  }
export const updateUserPhotoFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (updateUserPhotoFailure.match(action)) {
      // TODO: this should be handled by the notification module
      notification('danger', 'An error occurred.', action.payload)
    }
    return result
  }

export const fetchUserCredentialsFlow: Middleware =
  ({ dispatch, getState }) =>
  next =>
  action => {
    const result = next(action)
    if (fetchUserCredentials.match(action)) {
      const state = getState()
      const userId = selectId(state)
      const config = ApiUtils.prependIdToEndpointInConfig(ApiUsersConstants.USERS_CREDENTIALS_GET_BY_ID_CONFIG)(userId)
      dispatch(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: fetchUserCredentialsSuccess,
            onFailure: fetchUserCredentialsFailure,
          }),
          action.payload,
        ),
      )
    }
    return result
  }
export const fetchUserCredentialsSuccessFlow: Middleware = _store => next => action => {
  const result = next(action)

  if (fetchUserCredentialsSuccess.match(action)) {
  }
  return result
}

export const fetchUserCredentialsFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (fetchUserCredentialsFailure.match(action)) {
      // TODO: this should be handled by the notification module
      notification('danger', 'An error occurred.', 'Oops something went wrong! Please try again.')
    }
    return result
  }
