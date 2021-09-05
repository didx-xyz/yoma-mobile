import { createSelector } from '@reduxjs/toolkit'
import { prop } from 'ramda'
import { RootState } from 'redux/redux.types'

export const selectUserJobs = (state: RootState) => state.userJobs
export const selectFormValues = createSelector(selectUserJobs, prop(['formValues']))
