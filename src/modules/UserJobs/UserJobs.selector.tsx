import { createSelector } from '@reduxjs/toolkit'
import { path } from 'ramda'
import { RootState } from 'redux/redux.types'

export const selectUserJobs = (state: RootState) => state.userJobs
export const selectUserJobsFormValues = createSelector(selectUserJobs, path(['formValues']))
