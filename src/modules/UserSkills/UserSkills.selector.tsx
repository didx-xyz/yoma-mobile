import { createSelector } from '@reduxjs/toolkit'
import { prop } from 'ramda'
import { RootState } from 'redux/redux.types'

export const selectUserSkills = (state: RootState) => state.userSkills
export const selectFormValues = createSelector(selectUserSkills, prop(['formValues']))
