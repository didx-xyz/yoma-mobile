import { createAction, createReducer } from '@reduxjs/toolkit'
import { mergeDeepRight } from 'ramda'

import { CredentialRequestPayload } from './Credentials.types'

const name = '[Credentials]'
export const INITIAL_STATE = {}
export const setCredentials = createAction<CredentialRequestPayload>(`${name} setCredentials`)
export const clearCredentials = createAction(`${name} clearCredentials`)
export const createCredentials = createAction<CredentialRequestPayload>(`${name} createCredentials`)
export const createCredentialsSuccess = createAction<CredentialRequestPayload>(`${name} createCredentialsSuccess`)
export const createCredentialsFailure = createAction<CredentialRequestPayload>(`${name} createCredentialsFailure`)

export const fetchUserCredentials = createAction(`${name} fetchUserCredentials`)
export const fetchUserCredentialsSuccess = createAction<any>(`${name} fetchUserCredentialsSuccess`)
export const fetchUserCredentialsFailure = createAction<string>(`${name} fetchUserCredentialsFailure`)

export const updateCredentials = createAction<CredentialRequestPayload>(`${name} updateCredentials`)
export const updateCredentialsSuccess = createAction(`${name} updateCredentialsSuccess`)
export const updateCredentialsFailure = createAction<string>(`${name} updateCredentialsFailure`)

const CredentialsReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setCredentials, (state, action) => mergeDeepRight(state)(action.payload))
  builder.addCase(clearCredentials, () => INITIAL_STATE)
})

export default CredentialsReducer
