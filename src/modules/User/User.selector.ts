import { createSelector } from '@reduxjs/toolkit'
import { prop } from 'ramda'
import { RootState } from 'redux/redux.types'

export const selectUserState = (state: RootState) => state.user
export const selectUserId = createSelector(selectUserState, prop('id'))
