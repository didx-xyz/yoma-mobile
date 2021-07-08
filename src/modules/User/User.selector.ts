import { createSelector } from '@reduxjs/toolkit'
import { prop } from 'ramda'
import { RootState } from 'redux/redux.types'

export const selectUserState = (state: RootState) => state.user
export const selectUserId: (state: RootState) => string = createSelector(selectUserState, prop('id'))
