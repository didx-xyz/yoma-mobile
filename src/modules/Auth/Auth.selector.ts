import { createSelector } from '@reduxjs/toolkit'
import { equals, not, propOr } from 'ramda'
import { RootState } from 'redux/redux.types'

export const selectAuthState = (state: Partial<RootState>) => state.auth
export const selectToken = createSelector(selectAuthState, propOr(null, 'token'))
export const selectIsAuthenticated = createSelector(selectToken, token => equals(not(token), false))
