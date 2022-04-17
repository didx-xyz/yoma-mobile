import { createAction, createReducer } from '@reduxjs/toolkit'
import { mergeDeepRight } from 'ramda'

import { AuthState, OAuthLoginFailureResponse, OAuthLoginSuccessResponse, OAuthUserResponse } from './Auth.types'

const name = '[Auth]'
export const INITIAL_STATE = {} as AuthState

export const authorize = createAction(`${name} authorize`)
export const login = createAction(`${name} login`)
export const loginSuccess = createAction<OAuthLoginSuccessResponse>(`${name} loginSuccess`)
export const loginFailure = createAction<OAuthLoginFailureResponse>(`${name} loginFailure`)

export const fetchUserFromOAuth = createAction(`${name} fetchUserFromOAuth`)
export const fetchUserFromOAuthSuccess = createAction<OAuthUserResponse>(`${name} fetchUserFromOAuthSuccess`)
export const fetchUserFromOAuthFailure = createAction<string>(`${name} fetchUserFromOAuthFailure`)

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

export const logout = createAction(`${name} logout`)

const authReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(clearAuth, () => INITIAL_STATE)
  builder.addCase(setAuthCredentials, (state, action) => mergeDeepRight(state)(action.payload))
})

export default authReducer
