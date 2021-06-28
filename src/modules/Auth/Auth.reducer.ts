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

export const authLogin = createAction<AuthCredentials>(`${name} Login`)
export const authLogout = createAction(`${name} Logout`)
export const authLoginSuccess = createAction<AuthLoginSuccessResponse>(`${name} Login Success`)
export const authLoginFailure = createAction<AuthLoginFailureResponse>(`${name} Login Failure`)
export const setAuthCredentials = createAction<AuthState>(`${name} Set Auth Credentials`)
export const setUserLoginCredentials = createAction<AuthState>(`${name} Set User Login Credentials`)
export const authRegistration = createAction<AuthRegistration>(`${name} Registration`)
export const setSecureRefreshToken = createAction<string>(`${name} setSecureRefreshToken`)
export const setSecureRefreshTokenSuccess = createAction(`${name} setSecureRefreshTokenSuccess`)
export const setSecureRefreshTokenFailure = createAction<any>(`${name} setSecureRefreshTokenFailure`)

export const authRegistrationSuccess = createAction<AuthRegistrationSuccessResponse>(`${name} Registration Success`)
export const authRegistrationFailure = createAction<AuthRegistrationFailureResponse>(`${name} Registration Failure`)
export const clearAuth = createAction(`${name} clearAuth`)

const authReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setAuthCredentials, (state, action) => mergeDeepRight(state)(action.payload))
  builder.addCase(clearAuth, () => INITIAL_STATE)
  builder.addCase(setUserLoginCredentials, (state, action) => mergeDeepRight(state)(action.payload))
})

export default authReducer
