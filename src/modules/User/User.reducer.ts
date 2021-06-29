import { createAction, createReducer } from '@reduxjs/toolkit'
import { UserResponse } from 'modules/Auth/Auth.types'
import { mergeDeepRight } from 'ramda'

const name = '[User]'
export const INITIAL_STATE = {}

export const setUserData = createAction<UserResponse>(`${name}`)

const UserReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setUserData, (state, action) => mergeDeepRight(state)(action.payload))
})

export default UserReducer
