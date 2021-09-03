import { createSelector } from '@reduxjs/toolkit'
import { map, pick, pipe, prop, values } from 'ramda'
import { RootState } from 'redux/redux.types'

import { UserJobItem } from './UserJobs.types'

export const selectUserJobs = (state: RootState) => state.userJobs
export const selectFormValues = createSelector(selectUserJobs, prop(['formValues']))

export const selectUserJobItems = createSelector<any, any, UserJobItem[]>(
  selectUserJobs,
  pipe(prop('entities'), values, map(pick(['job', 'startDate', 'endDate']))),
)
