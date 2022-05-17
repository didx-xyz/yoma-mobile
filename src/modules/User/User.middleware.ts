import i18n from 'i18next'
import { mergeRight } from 'ramda'
import { Middleware } from 'redux'

import { actions as ApiActions } from '~/api'
import { constants as ApiUsersConstants } from '~/api/users'
import * as UserSkillsActions from '~/modules/UserSkills/UserSkills.reducer'
import * as ReduxUtils from '~/redux/redux.utils'
import { showSimpleMessage } from '~/utils/error'

import { fetchUserFromOAuthSuccess } from '../Auth/Auth.reducer'
import { HomeNavigationRoutes } from '../HomeNavigation/HomeNavigation.types'
import * as Navigation from '../Navigation/Navigation.utils'
import { CAPTURE_IMAGE_OPTIONS } from './User.constants'
import {
  fetchUserCredentials,
  fetchUserCredentialsFailure,
  fetchUserCredentialsSuccess,
  fetchUserDetails,
  fetchUserDetailsFailure,
  fetchUserDetailsSuccess,
  hydrateUser,
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
  extractUserFromPayload,
  extractUserFromUpdateUserPayload,
  extractUserFromUserUpdateSuccess,
} from './User.utils'

export const setUserOnAuthFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (fetchUserFromOAuthSuccess.match(action)) {
      const user = extractUserFromPayload(action)
      dispatch(setUser(user))
      dispatch(hydrateUser())
    }
    return result
  }

export const hydrateUserFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (hydrateUser.match(action)) {
      dispatch(fetchUserDetails())
      dispatch(fetchUserCredentials())
      dispatch(UserSkillsActions.fetchUserSkills())
    }
    return result
  }

export const fetchUserDetailsFlow: Middleware =
  ({ getState, dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (fetchUserDetails.match(action)) {
      const state = getState()
      const userId = selectId(state)

      dispatch(
        ApiActions.apiRequest(
          mergeRight(ApiUsersConstants.USERS_GET_BY_ID_CONFIG, {
            onSuccess: fetchUserDetailsSuccess,
            onFailure: fetchUserDetailsFailure,
            endpoint: userId,
          }),
        ),
      )
    }
    return result
  }

export const fetchUserDetailsSuccessFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (fetchUserDetailsSuccess.match(action)) {
      const user = extractUserFromUserUpdateSuccess(action)
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

export const fetchUserCredentialsFlow: Middleware =
  ({ dispatch, getState }) =>
  next =>
  action => {
    const result = next(action)
    if (fetchUserCredentials.match(action)) {
      const config = ReduxUtils.buildConfig(ApiUsersConstants.USERS_CREDENTIALS_GET_BY_ID_CONFIG, getState())

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
        const errorMessage = typeof error === 'string' ? error : i18n.t('Oops something went wrong! Please try again.')
        dispatch(uploadUserPhotoFailure(errorMessage))
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
      const config = ReduxUtils.buildConfig(ApiUsersConstants.USERS_PHOTO_CREATE_CONFIG, getState())

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
