import { createSelector } from '@reduxjs/toolkit'
import { propOr, prop } from 'ramda'
import { RootState } from 'redux/redux.types'

export const selectUser = (state: RootState) => state.user
export const selectBiography = createSelector(selectUser, propOr('', 'biography'))
export const selectId: (state: RootState) => string = createSelector(selectUser, prop('id'))
