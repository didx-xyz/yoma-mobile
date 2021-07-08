import { mergeDeepRight } from 'ramda'
import { Action, Middleware } from 'redux'

export const createMiddlewareStub = (jest: any, state?: {}) => (middleware: Middleware) => {
  const store = {
    getState: jest.fn(() => state),
    dispatch: jest.fn(),
  }
  const next = jest.fn()

  const invoke = (action: Action) => middleware(store)(next)(action)

  return { store, next, invoke }
}

export const createFixture = mergeDeepRight
