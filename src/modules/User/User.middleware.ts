import { authLoginSuccess } from 'modules/Auth/Auth.reducer'
import { Middleware } from 'redux'

import { setUserCredentials } from './User.reducer'
import { selectUserCredentialsFromLoginPayload } from './User.utils'

export const setUserOnAuthFlow: Middleware =
  ({ dispatch }) =>
  next =>
  async action => {
    const result = next(action)
    if (authLoginSuccess.match(action)) {
      const credentials = selectUserCredentialsFromLoginPayload(action)
      dispatch(setUserCredentials(credentials))
    }
    return result
  }
