import { authLoginSuccess } from 'modules/Auth/Auth.reducer'
import { Middleware } from 'redux'

import { setUser } from './User.reducer'
import { selectUserFromLoginPayload } from './User.utils'

export const setUserOnAuthFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (authLoginSuccess.match(action)) {
      const user = selectUserFromLoginPayload(action)
      dispatch(setUser(user))
    }
    return result
  }
