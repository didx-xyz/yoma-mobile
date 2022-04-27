import { createSelector } from '@reduxjs/toolkit'
import { complement, isNil, propOr } from 'ramda'

import { RootState } from '~/redux/redux.types'

export const selectAuth = (state: RootState) => state.auth
export const selectToken = createSelector(selectAuth, propOr(null, 'token'))
export const selectIsAuthenticated: (state: RootState) => boolean = createSelector(selectToken, complement(isNil))
