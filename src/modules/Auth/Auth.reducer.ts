import { createAction, createReducer } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { mergeDeepRight } from 'ramda'

import { AuthCredentials, AuthState } from './Auth.types'

const name = '[Auth]'
export const INITIAL_STATE = {
  refreshToken: '',
  token: '',
  expiresAt: '',
} as AuthState

export const authLogin = createAction<AuthCredentials>(`${name} Login`)
export const authLoginSuccess = createAction<AxiosResponse>(`${name} Login Success`)
export const authLoginFailure = createAction<string>(`${name} Login Failure`)
export const setAuthCredentials = createAction<AuthState>(`${name} Set Auth Credentials`)

const authReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(authLoginSuccess, (state, action) => mergeDeepRight(state)(action.payload))
})

export default authReducer
