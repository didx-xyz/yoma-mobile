import { createSelector } from '@reduxjs/toolkit'
import { prop } from 'ramda'
import { RootState } from 'redux/redux.types'

export const selectUser = (state: RootState) => state.user
export const selectBiography = createSelector(selectUser, prop('biography'))
export const selectUserId = createSelector(selectUser, prop('id'))
