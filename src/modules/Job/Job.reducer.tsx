import { createAction, createReducer } from '@reduxjs/toolkit'
import { UserCredentialPayload } from 'modules/User/User.types'
import { mergeRight } from 'ramda'

import { JobCredentialsTmpFormValues, JobRequestPayload, JobResponsePayload, JobState } from './Job.types'

const name = '[Job]'
export const INITIAL_STATE = {
  tmpFormValues: {},
  jobEntities: {},
} as JobState

export const setJobEntities = createAction<JobResponsePayload>(`${name} setJobEntities`)
export const setTmpFormValues = createAction<JobCredentialsTmpFormValues>(`${name} setTmpFormValues`)

export const createJob = createAction<JobRequestPayload>(`${name} createJob`)
export const createJobSuccess = createAction<JobResponsePayload>(`${name} createJobSuccess`)
export const createJobFailure = createAction<string>(`${name} createJobFailure`)

export const createJobCredentials = createAction<UserCredentialPayload>(`${name} createJobCredentials`)
export const createJobCredentialsSuccess = createAction<string>(`${name} createJobCredentialsSuccess`)
export const createJobCredentialsFailure = createAction<string>(`${name} createJobCredentialsFailure`)

export const clearJobs = createAction(`${name} clearJobs`)

const JobsReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setTmpFormValues, (state, action) => ({
    ...state,
    tmpFormValues: mergeRight(state.tmpFormValues)(action.payload),
  }))
  builder.addCase(clearJobs, (_state, _action) => INITIAL_STATE)
})

export default JobsReducer
