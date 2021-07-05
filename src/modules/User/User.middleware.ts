import { authLoginSuccess } from 'modules/Auth/Auth.reducer'
import { mergeRight } from 'ramda'
import { Middleware } from 'redux'

import { actions as ApiActions } from '../../api'
import { constants as ApiUsersConstants } from '../../api/users'
import {
  fetchUserCredentials,
  fetchUserCredentialsFailure,
  fetchUserCredentialsSuccess,
  setUserCredentials,
} from './User.reducer'
import { selectUserId } from './User.selector'
import { selectUserCredentialsFromLoginPayload } from './User.utils'

export const setUserOnAuthFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (authLoginSuccess.match(action)) {
      const credentials = selectUserCredentialsFromLoginPayload(action)
      dispatch(setUserCredentials(credentials))
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
      const userId = selectUserId(state)
      dispatch(
        ApiActions.apiRequest(
          mergeRight(ApiUsersConstants.USERS_CREDENTIALS_GET_BY_ID_CONFIG, {
            onSuccess: fetchUserCredentialsSuccess,
            onFailure: fetchUserCredentialsFailure,
            endpoint: [userId, ApiUsersConstants.USERS_CREDENTIALS_GET_BY_ID_CONFIG.endpoint],
          }),
          action.payload,
        ),
      )
    }
    return result
  }
