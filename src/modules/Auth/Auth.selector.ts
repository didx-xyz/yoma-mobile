import { createSelector } from '@reduxjs/toolkit'
import { equals, not } from 'ramda'
import { RootState } from 'redux/redux.types'

const selectAuthState = (state: Partial<RootState>) => state.auth
export const selectToken = createSelector(selectAuthState, authState => (authState ? authState.token : null))
export const selectIsAuthenticated = createSelector(selectToken, token => equals(not(token), false))
