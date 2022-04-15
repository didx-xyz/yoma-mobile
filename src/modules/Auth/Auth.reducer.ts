import { createAction, createReducer } from '@reduxjs/toolkit'
import { mergeDeepRight } from 'ramda'

import { AuthLoginFailureResponse, AuthState, OAuthLoginSuccessResponse } from './Auth.types'

const name = '[Auth]'
export const INITIAL_STATE = {} as AuthState

export const authorize = createAction(`${name} authorize`)
export const login = createAction(`${name} login`)
export const loginSuccess = createAction<OAuthLoginSuccessResponse>(`${name} loginSuccess`)
export const loginFailure = createAction<AuthLoginFailureResponse>(`${name} loginFailure`)

export const getSecureRefreshToken = createAction(`${name} getSecureRefreshToken`)
export const getSecureRefreshTokenSuccess = createAction<string>(`${name} getSecureRefreshTokenSuccess`)
export const getSecureRefreshTokenFailure = createAction<string>(`${name} getSecureRefreshTokenFailure`)

export const setSecureRefreshToken = createAction<string>(`${name} setSecureRefreshToken`)
export const setSecureRefreshTokenSuccess = createAction(`${name} setSecureRefreshTokenSuccess`)
export const setSecureRefreshTokenFailure = createAction<any>(`${name} setSecureRefreshTokenFailure`)

export const noRefreshTokenInSecureStore = createAction(`${name} noRefreshTokenInSecureStore`)

export const deleteSecureRefreshToken = createAction(`${name} deleteSecureRefreshToken`)
export const deleteSecureRefreshTokenSuccess = createAction(`${name} deleteSecureRefreshTokenSuccess`)
export const deleteSecureRefreshTokenFailure = createAction<string>(`${name} deleteSecureRefreshTokenFailure`)

export const authorizeWithRefreshTokenSuccess = createAction<string>(`${name} authWithRefreshTokenSuccess`)
export const authorizeWithRefreshTokenFailure = createAction<string>(`${name} authWithRefreshTokenFailure`)

export const clearAuth = createAction(`${name} clearAuth`)

export const setAuthCredentials = createAction<AuthState>(`${name} setAuthCredentials`)
export const setUserLoginCredentials = createAction<AuthState>(`${name} setUserLoginCredentials`)

export const logout = createAction(`${name} logout`)

const authReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(clearAuth, (_state, _action) => INITIAL_STATE)
  builder.addCase(setAuthCredentials, (state, action) => mergeDeepRight(state)(action.payload))
  builder.addCase(setUserLoginCredentials, (state, action) => mergeDeepRight(state)(action.payload))
})

export default authReducer
