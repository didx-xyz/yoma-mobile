import { createSelector } from '@reduxjs/toolkit'
import { map, pick, pipe, prop, values } from 'ramda'
import { RootState } from 'redux/redux.types'

export const selectUserJobs = (state: RootState) => state.userJobs
export const selectFormValues = createSelector(selectUserJobs, prop(['formValues']))

export const selectUserJobItem = createSelector(
  selectUserJobs,
  pipe(prop('entities'), values, map(pick(['job', 'startDate', 'endDate']))),
)

export default createSelector(selectUserJobItem, userJobs => ({
  userJobs,
}))
