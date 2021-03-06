import { mergeDeepRight } from 'ramda'
import { Action, Middleware } from 'redux'

import { RootState } from '~/redux/redux.types'
import { StdObj } from '~/types/general.types'

export const createMiddlewareMock = (jest: any, state?: Partial<RootState>) => (middleware: Middleware) => {
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
