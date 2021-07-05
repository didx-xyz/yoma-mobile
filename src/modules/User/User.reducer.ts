import { createAction, createReducer } from '@reduxjs/toolkit'
import { UserResponse } from 'modules/Auth/Auth.types'
import { mergeDeepRight } from 'ramda'

import {
  UpdateUserCredentialsFailureResponse,
  UpdateUserCredentialsResponse,
  UserCredentialsPayload,
} from './User.types'

const name = '[User]'
export const INITIAL_STATE = {}

export const setUserCredentials = createAction<UserResponse>(`${name} setUserCredentials`)
export const updateUserCredentials = createAction<UserCredentialsPayload>(`${name} updateUserCredentials`)
export const updateUserCredentialsSuccess = createAction<UpdateUserCredentialsResponse>(
  `${name} updateUserCredentialsSuccess`,
)
export const updateUserCredentialsFailure = createAction<UpdateUserCredentialsFailureResponse>(
  `${name} updateUserCredentialsFailure`,
)

const UserReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setUserCredentials, (state, action) => mergeDeepRight(state)(action.payload))
})

export default UserReducer
