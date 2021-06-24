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
export const authLoginSuccess = createAction<AuthLoginSuccessResponse>(`${name} Login Success`)
export const authLoginFailure = createAction<AuthLoginFailureResponse>(`${name} Login Failure`)

export const authRegistration = createAction<AuthRegistration>(`${name} authRegistration`)
export const authRegistrationSuccess = createAction<AuthRegistrationSuccessResponse>(
  `${name} AuthRegistrationSuccessResponse`,
)
export const authRegistrationFailure = createAction<AuthRegistrationFailureResponse>(
  `${name} AuthRegistrationFailureResponse`,
)

export const setSecureRefreshToken = createAction<string>(`${name} setSecureRefreshToken`)
export const setSecureRefreshTokenSuccess = createAction(`${name} setSecureRefreshTokenSuccess`)
export const setSecureRefreshTokenFailure = createAction<string>(`${name} setSecureRefreshTokenFailure`)

export const getSecureRefreshToken = createAction(`${name} getSecureRefreshToken`)
export const getSecureRefreshTokenSuccess = createAction<string>(`${name} getSecureRefreshTokenSuccess`)
export const getSecureRefreshTokenFailure = createAction<string>(`${name} getSecureRefreshTokenFailure`)

export const authWithRefreshTokenSuccess = createAction<string>(`${name} authWithRefreshTokenSuccess`)
export const authWithRefreshTokenFailure = createAction<string>(`${name} authWithRefreshTokenFailure`)

export const setAuthCredentials = createAction<AuthState>(`${name} Set Auth Credentials`)

const authReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setAuthCredentials, (state, action) => mergeDeepRight(state)(action.payload))
})

export default authReducer
