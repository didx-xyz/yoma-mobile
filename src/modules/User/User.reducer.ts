import { createAction, createReducer } from '@reduxjs/toolkit'
import { mergeDeepRight } from 'ramda'

import { UserResponse } from '../Auth/Auth.types'
import { UpdateUserFailureResponse, UpdateUserResponse, UserPayload } from './User.types'

const name = '[User]'
export const INITIAL_STATE = {}

export const setUser = createAction<UserResponse>(`${name} setUser`)
export const updateUser = createAction<UserPayload>(`${name} updateUser`)
export const updateUserSuccess = createAction<UpdateUserResponse>(`${name} updateUserSuccess`)
export const updateUserFailure = createAction<UpdateUserFailureResponse>(`${name} updateUserFailure`)

const UserReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setUser, (state, action) => mergeDeepRight(state)(action.payload))
})

export default UserReducer
