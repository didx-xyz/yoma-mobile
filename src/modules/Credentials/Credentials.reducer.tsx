import { createAction, createReducer } from '@reduxjs/toolkit'

import { Credential } from './Credentials.types'

const name = '[Credentials]'
export const INITIAL_STATE = [] as Array<Credential>
export const setCredentials = createAction<Credential>(`${name} setCredentials`)
export const clearCredentials = createAction(`${name} clearCredentials`)
export const createCredentials = createAction<Credential>(`${name} createCredentials`)
export const createCredentialsSuccess = createAction<Credential>(`${name} createCredentialsSuccess`)
export const createCredentialsFailure = createAction<Credential>(`${name} createCredentialsFailure`)
export const updateCredentials = createAction<Credential>(`${name} updateCredentials`)
export const updateCredentialsSuccess = createAction(`${name} updateCredentialsSuccess`)
export const updateCredentialsFailure = createAction<string>(`${name} updateCredentialsFailure`)

const CredentialsReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setCredentials, (state, action) => state.concat(action.payload))
  builder.addCase(clearCredentials, () => INITIAL_STATE)
})

export default CredentialsReducer
