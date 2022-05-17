import { createSelector } from '@reduxjs/toolkit'
import { prop } from 'ramda'

import { RootState } from '~/redux/redux.types'

export const selectUser = (state: RootState) => state.user
export const selectBiography = createSelector<any, string>(selectUser, prop('biography'))
export const selectId: (state: RootState) => string = createSelector(selectUser, prop('id'))
export const selectPhotoUrl = createSelector(selectUser, prop('photoURL'))
export const selectZltoBalance = createSelector(selectUser, prop('zltoBalance'))
