import { createSelector } from '@reduxjs/toolkit'
import { path, propOr } from 'ramda'
import { RootState } from 'redux/redux.types'

export const selectUser = (state: RootState) => state.user
export const selectBiography = createSelector(selectUser, propOr('', 'biography'))
export const selectUserId = createSelector(selectUser, path(['user', 'id']))
