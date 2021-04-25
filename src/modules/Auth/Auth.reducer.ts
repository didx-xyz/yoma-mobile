import { createAction, createReducer } from '@reduxjs/toolkit'
import { mergeDeepRight } from 'ramda'

import { AuthCredentials, AuthLoginFailureResponse, AuthLoginSuccessResponse, AuthState } from './Auth.types'

const name = '[Auth]'
export const INITIAL_STATE = {
  refreshToken: '',
  token: '',
  expiresAt: '',
} as AuthState

export const authLogin = createAction<AuthCredentials>(`${name} Login`)
export const authLoginSuccess = createAction<AuthLoginSuccessResponse>(`${name} Login Success`)
export const authLoginFailure = createAction<AuthLoginFailureResponse>(`${name} Login Failure`)
export const setAuthCredentials = createAction<AuthState>(`${name} Set Auth Credentials`)

const authReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setAuthCredentials, (state, action) => mergeDeepRight(state)(action.payload))
})

export default authReducer
