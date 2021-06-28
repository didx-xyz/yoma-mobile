import { Middleware } from 'redux'

export const testFlow: Middleware = _store => next => async action => {
  const result = next(action)

  return result
}
