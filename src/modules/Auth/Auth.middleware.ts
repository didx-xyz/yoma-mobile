import { Middleware } from 'redux'

import { logout, authorize } from './Auth.reducer'

export const authorizeFlow = (): Middleware => _store => next => async action => {
  const result = next(action)

  if (authorize.match(action)) {
    // authorize the user
    console.log('Logging in a user')
  }

  return result
}

export const logoutFlow = (): Middleware => _store => next => async action => {
  const result = next(action)

  if (logout.match(action)) {
    // logout the user
  }

  return result
}
