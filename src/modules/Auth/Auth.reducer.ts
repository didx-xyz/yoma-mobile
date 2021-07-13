import { createAction, createReducer } from '@reduxjs/toolkit'
import { mergeDeepRight } from 'ramda'

import {
  AuthCredentials,
  AuthLoginFailureResponse,
  AuthLoginSuccessResponse,
  AuthRegistration,
  AuthRegistrationFailureResponse,
  AuthRegistrationSuccessResponse,
  AuthState,
} from './Auth.types'

const name = '[Auth]'
export const INITIAL_STATE = {} as AuthState

export const authorize = createAction<AuthCredentials>(`${name} authorize`)
export const login = createAction<AuthCredentials>(`${name} login`)
export const loginSuccess = createAction<AuthLoginSuccessResponse>(`${name} loginSuccess`)
export const loginFailure = createAction<AuthLoginFailureResponse>(`${name} loginFailure`)
export const logout = createAction(`${name} Logout`)

export const register = createAction<AuthRegistration>(`${name} register`)
export const registerSuccess = createAction<AuthRegistrationSuccessResponse>(`${name} registerSuccess`)
export const registerFailure = createAction<AuthRegistrationFailureResponse>(`${name} registerFailure`)

export const setSecureRefreshToken = createAction<string>(`${name} setSecureRefreshToken`)
export const setSecureRefreshTokenSuccess = createAction(`${name} setSecureRefreshTokenSuccess`)
export const setSecureRefreshTokenFailure = createAction<any>(`${name} setSecureRefreshTokenFailure`)

export const getSecureRefreshToken = createAction(`${name} getSecureRefreshToken`)
export const getSecureRefreshTokenSuccess = createAction<string>(`${name} getSecureRefreshTokenSuccess`)
export const getSecureRefreshTokenFailure = createAction<string>(`${name} getSecureRefreshTokenFailure`)

export const noRefreshTokenInSecureStore = createAction(`${name} noRefreshTokenInSecureStore`)

export const deleteSecureRefreshToken = createAction(`${name} deleteSecureRefreshToken`)
export const deleteSecureRefreshTokenSuccess = createAction(`${name} deleteSecureRefreshTokenSuccess`)
export const deleteSecureRefreshTokenFailure = createAction<string>(`${name} deleteSecureRefreshTokenFailure`)

export const authWithRefreshTokenSuccess = createAction<string>(`${name} authWithRefreshTokenSuccess`)
export const authWithRefreshTokenFailure = createAction<string>(`${name} authWithRefreshTokenFailure`)

export const clearAuth = createAction(`${name} clearAuth`)
export const setAuthCredentials = createAction<AuthState>(`${name} Set Auth Credentials`)
export const setUserLoginCredentials = createAction<AuthState>(`${name} Set User Login Credentials`)

const authReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(clearAuth, (_state, _action) => INITIAL_STATE)
  builder.addCase(setAuthCredentials, (state, action) => mergeDeepRight(state)(action.payload))
  builder.addCase(setUserLoginCredentials, (state, action) => mergeDeepRight(state)(action.payload))
})

export default authReducer
