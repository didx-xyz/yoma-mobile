import { createSelector } from '@reduxjs/toolkit'
import { path } from 'ramda'
import { RootState } from 'redux/redux.types'

export const selectUserJobs = (state: RootState) => state.job
export const selectUserJobsTmpFormValues = createSelector(selectUserJobs, path(['tmpFormValues']))
export const selectUserJobsCredentialIdFromTmpFormValues = createSelector(
  selectUserJobsTmpFormValues,
  path(['credentialId']),
)
export const selectUserJobsEntities = createSelector(selectUserJobs, path(['jobEntities', 'entities']))
