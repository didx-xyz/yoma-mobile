import { Middleware } from 'redux'

import { showSimpleMessage } from '../../utils/error'
import { authLogin, authLoginFailure, authLoginSuccess, setAuthCredentials } from './Auth.reducer'
import { AuthLoginFailureResponse, AuthLoginSuccessResponse } from './Auth.types'
import { getCredentialsFromAuthSuccess } from './Auth.utils'

export const authLoginFlow = ({ api }: { api: any }): Middleware => ({ dispatch }) => next => async action => {
  const result = next(action)

  // TODO: Abstract the api calls into a single api middleware
  if (authLogin.match(action)) {
    await api.auth
      .login(action.payload)
      .then((response: AuthLoginSuccessResponse) => {
        dispatch(authLoginSuccess(response))
      })
      .catch((error: AuthLoginFailureResponse) => {
        dispatch(authLoginFailure(error))
      })
  }

  return result
}

export const authSetCredentialsFlow = ({ notification }: { notification: typeof showSimpleMessage }): Middleware => ({
  dispatch,
}) => next => async action => {
  const result = next(action)

  if (authLoginSuccess.match(action)) {
    const credentials = getCredentialsFromAuthSuccess(action)
    // TODO: this should be handled by the notification module
    notification('success', 'Login Successful')
    dispatch(setAuthCredentials(credentials))
  }
  return result
}

export const authLoginFailureFlow = ({
  notification,
}: {
  notification: typeof showSimpleMessage
}): Middleware => _store => next => async action => {
  const result = next(action)

  if (authLoginFailure.match(action)) {
    // TODO: this should be handled by the notification module
    notification('danger', 'Error', action.payload)
  }

  return result
}
