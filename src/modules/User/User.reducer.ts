import { createAction, createReducer } from '@reduxjs/toolkit'
import { UserResponse } from 'modules/Auth/Auth.types'
import { mergeDeepRight } from 'ramda'

const name = '[User]'
export const INITIAL_STATE = {}

export const setUserCredentials = createAction<UserResponse>(`${name} Set User Credentials`)

const UserReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setUserCredentials, (state, action) => mergeDeepRight(state)(action.payload))
})

export default UserReducer
