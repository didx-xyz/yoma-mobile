import { createAction, createSlice } from '@reduxjs/toolkit'

import { AuthState } from './Auth.types'

export const INITIAL_STATE = {} as AuthState

const name = '[Auth]'

export const authorize = createAction(`${name}/authorize`)
export const logout = createAction(`${name}/logout`)

// TODO: not sure I like create Slice - might be worth rolling with redux/toolkit's other helpers directly rather
export const authSlice = createSlice({
  name,
  initialState: INITIAL_STATE,
  reducers: {
    clearAuthCredentials: () => INITIAL_STATE,
  },
})

export const { clearAuthCredentials } = authSlice.actions

export default authSlice.reducer
