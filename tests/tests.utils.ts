import { mergeDeepRight } from 'ramda'
import { Action, Middleware } from 'redux'

import { StdObj } from '../src/types/general.types'

export const createMiddlewareMock = (jest: any, state?: {}) => (middleware: Middleware) => {
  const store = {
    getState: jest.fn(() => state),
    dispatch: jest.fn(),
  }
  const next = jest.fn()

  const invoke = (action: Action) => middleware(store)(next)(action)

  return { store, next, invoke }
}

export const createFixture =
  (stateMock: StdObj) =>
  (override = {}) =>
    mergeDeepRight(stateMock)(override)
