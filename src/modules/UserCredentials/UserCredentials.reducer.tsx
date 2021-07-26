import { createAction, createReducer } from '@reduxjs/toolkit'
import { mergeDeepRight } from 'ramda'

import { UserCredentialRequestPayload } from './UserCredentials.types'

const name = '[UserCredentials]'
export const INITIAL_STATE = []
export const setUserCredentials = createAction<UserCredentialRequestPayload>(`${name} setUserCredentials`)
export const clearUserCredentials = createAction(`${name} clearUserCredentials`)

export const fetchUserCredentials = createAction(`${name} fetchUserCredentials`)
export const fetchUserCredentialsSuccess = createAction<any>(`${name} fetchUserCredentialsSuccess`)
export const fetchUserCredentialsFailure = createAction<string>(`${name} fetchUserCredentialsFailure`)

const UserCredentialsReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setUserCredentials, (state, action) => mergeDeepRight(state)(action.payload))
  builder.addCase(clearUserCredentials, () => INITIAL_STATE)
})

export default UserCredentialsReducer
