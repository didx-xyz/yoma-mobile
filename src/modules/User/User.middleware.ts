import { authLoginSuccess } from 'modules/Auth/Auth.reducer'
import { HomeNavigationRoutes } from 'modules/Home/Home.routes'
import { mergeRight } from 'ramda'
import { Middleware } from 'redux'
import { showSimpleMessage } from 'utils/error'

import { actions as ApiActions } from '../../api'
import { constants as ApiUserConstants } from '../../api/users'
import * as NavigationActions from '../AppNavigation/AppNavigation.actions'
import { setUser, updateUser, updateUserFailure, updateUserSuccess } from './User.reducer'
import { extractUser, selectUserFromLoginPayload, selectUserFromUpdatePayload, selectUserId } from './User.utils'

export const setUserOnAuthFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (authLoginSuccess.match(action)) {
      const credentials = selectUserFromLoginPayload(action)
      dispatch(setUser(credentials))
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
      const userId = selectUserId(state)
      const user = extractUser(action)(state)
      dispatch(
        ApiActions.apiRequest(
          mergeRight(ApiUserConstants.USERS_EDIT_CONFIG, {
            onSuccess: updateUserSuccess,
            onFailure: updateUserFailure,
            endpoint: userId,
          }),
          user,
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
      const credentials = selectUserFromUpdatePayload(action)
      dispatch(setUser(credentials))
      NavigationActions.navigate(HomeNavigationRoutes.Home)
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
