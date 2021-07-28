import { createAction, createReducer } from '@reduxjs/toolkit'

const name = '[UserCredentials]'
export const INITIAL_STATE = [] as any
export const setUserCredentials = createAction<any[]>(`${name} setUserCredentials`)
export const clearUserCredentials = createAction(`${name} clearUserCredentials`)

export const fetchUserCredentials = createAction(`${name} fetchUserCredentials`)
export const fetchUserCredentialsSuccess = createAction<any>(`${name} fetchUserCredentialsSuccess`)
export const fetchUserCredentialsFailure = createAction<string>(`${name} fetchUserCredentialsFailure`)

const UserCredentialsReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setUserCredentials, (state, action) => action.payload)
  builder.addCase(clearUserCredentials, (_state, _action) => INITIAL_STATE)
})

export default UserCredentialsReducer
