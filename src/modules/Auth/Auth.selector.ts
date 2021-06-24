import { createSelector } from '@reduxjs/toolkit'
import { complement, isNil, propOr } from 'ramda'
import { RootState } from 'redux/redux.types'

export const selectAuthState = (state: RootState) => state.auth
export const selectToken = createSelector(selectAuthState, propOr(null, 'token'))
export const selectIsAuthenticated = createSelector(selectToken, complement(isNil))
