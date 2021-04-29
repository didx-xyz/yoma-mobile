import { Action, Middleware } from 'redux'

export const createMiddlewareMock = (jest: any) => (middleware: Middleware) => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  }
  const next = jest.fn()

  const invoke = (action: Action) => middleware(store)(next)(action)

  return { store, next, invoke }
}