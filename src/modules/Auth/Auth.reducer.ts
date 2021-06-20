import { createAction, createReducer } from '@reduxjs/toolkit'
import { mergeDeepRight } from 'ramda'

import {
  AuthCredentials,
  AuthLoginFailureResponse,
  AuthLoginSuccessResponse,
  AuthRegistration,
  AuthRegistrationFailureResponse,
  AuthRegistrationSuccessResponse,
  AuthSocialRegistrationCredentials,
  AuthState,
} from './Auth.types'

const name = '[Auth]'
export const INITIAL_STATE = {
  token: '',
  expiresAt: '',
} as AuthState

export const authLogin = createAction<AuthCredentials>(`${name} Login`)
export const authLoginSuccess = createAction<AuthLoginSuccessResponse>(`${name} Login Success`)
export const authLoginFailure = createAction<AuthLoginFailureResponse>(`${name} Login Failure`)
export const setAuthCredentials = createAction<AuthState>(`${name} Set Auth Credentials`)
export const authRegistration = createAction<AuthRegistration>(`${name} Registration`)
export const setSecureRefreshToken = createAction<string>(`${name} setSecureRefreshToken`)
export const setSecureRefreshTokenSuccess = createAction(`${name} setSecureRefreshTokenSuccess`)
export const setSecureRefreshTokenFailure = createAction<any>(`${name} setSecureRefreshTokenFailure`)
export const authSocialRegistration = createAction<AuthSocialRegistrationCredentials>(`${name} Social Registration`)
export const authRegistrationSuccess = createAction<AuthRegistrationSuccessResponse>(`${name} Registration Success`)
export const authRegistrationFailure = createAction<AuthRegistrationFailureResponse>(`${name} Registration Failure`)

const authReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setAuthCredentials, (state, action) => mergeDeepRight(state)(action.payload))
})

export default authReducer
