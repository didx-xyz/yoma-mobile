import { createSelector } from '@reduxjs/toolkit'
import { path } from 'ramda'
import { RootState } from 'redux/redux.types'

export const selectJob = (state: RootState) => state.job
export const selectJobTmpFormValues = createSelector(selectJob, path(['tmpFormValues']))
export const selectJobEntities = createSelector(selectJob, path(['jobEntities', 'entities']))
