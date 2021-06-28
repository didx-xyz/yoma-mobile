import { createAction, createReducer } from '@reduxjs/toolkit'

const name = '[User]'
export const INITIAL_STATE = {}

export const User = createAction(`${name}`)

const UserReducer = createReducer(INITIAL_STATE, builder => {})

export default UserReducer
