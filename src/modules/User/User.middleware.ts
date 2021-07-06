import { authLoginSuccess } from 'modules/Auth/Auth.reducer'
import { mergeRight } from 'ramda'
import { Middleware } from 'redux'

import { actions as ApiActions, utils as ApiUtils } from '../../api'
import { prependIdToEndpointInConfig } from '../../api/api.utils'
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

// TODO: add tests,
// TODO: add selector tests,
// TODO: wire this up to middleware.ts, and ✅
// TODO: add some App middleware ✅
// TODO: ensure that the App middleware runs on successful auth
export const fetchUserCredentialsFlow: Middleware =
  ({ dispatch, getState }) =>
  next =>
  action => {
    const result = next(action)
    if (fetchUserCredentials.match(action)) {
      const state = getState()
      const userId = selectUserId(state)
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
