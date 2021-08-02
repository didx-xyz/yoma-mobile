import { createSelector } from '@reduxjs/toolkit'
import { path, pick } from 'ramda'
import { RootState } from 'redux/redux.types'

export const selectJob = (state: RootState) => state.job
export const selectJobTmpFormValues = createSelector(selectJob, path(['tmpFormValues']))
export const selectJobEntities = createSelector(selectJob, pick(['jobEntities']))
