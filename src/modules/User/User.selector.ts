import { createSelector } from '@reduxjs/toolkit'
import { propOr } from 'ramda'
import { RootState } from 'redux/redux.types'

export const selectUserState = (state: RootState) => state.user

export const selectBiography = createSelector(selectUserState, propOr('', 'biography'))
