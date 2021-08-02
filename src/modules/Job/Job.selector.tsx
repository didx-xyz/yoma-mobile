import { createSelector } from '@reduxjs/toolkit'
import { pick } from 'ramda'
import { RootState } from 'redux/redux.types'

export const selectJob = (state: RootState) => state.job
export const selectJobTmpFormValues = createSelector(selectJob, pick('tmpFormValues'))
