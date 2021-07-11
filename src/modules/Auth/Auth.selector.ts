import { createSelector } from '@reduxjs/toolkit'
import { complement, isNil, path, pick, pipe, propOr } from 'ramda'
import { RootState } from 'redux/redux.types'

export const selectAuthState = (state: RootState) => state.auth
export const selectToken = createSelector(selectAuthState, propOr(null, 'token'))
export const selectIsAuthenticated: (state: RootState) => boolean = createSelector(selectToken, complement(isNil))
export const selectLoginCredentials = pipe(path(['auth']), pick(['email', 'password']))
