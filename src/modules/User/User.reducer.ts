import { createAction, createReducer } from '@reduxjs/toolkit'
import { mergeDeepRight } from 'ramda'

const name = '[User]'
export const INITIAL_STATE = {}

export const User = createAction(`${name}`)

const UserReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(User, (state, action) => mergeDeepRight(state)(action.payload))
})

export default UserReducer
