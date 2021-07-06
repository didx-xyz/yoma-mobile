import { createAction, createReducer } from '@reduxjs/toolkit'
import { mergeDeepRight } from 'ramda'

import { UserResponse } from '../Auth/Auth.types'

const name = '[User]'
export const INITIAL_STATE = {}

export const setUser = createAction<UserResponse>(`${name} setUser`)

const UserReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setUser, (state, action) => mergeDeepRight(state)(action.payload))
})

export default UserReducer
