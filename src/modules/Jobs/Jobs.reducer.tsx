import { createAction, createReducer } from '@reduxjs/toolkit'

import { Job, JobsRequest, JobsResponse, JobsState } from './Jobs.types'

const name = '[Jobs]'
export const INITIAL_STATE = {
  id: '',
  title: '',
  description: '',
  createdAt: '',
  createdByAdmin: false,
  language: '',
  published: false,
  skills: [],
} as JobsState

export const setJob = createAction<Job>(`${name} setJob`)

export const createJob = createAction<JobsRequest>(`${name} createJob`)
export const createJobSuccess = createAction<JobsResponse>(`${name} createJobSuccess`)
export const createJobFailure = createAction<string>(`${name} createJobFailure`)

export const clearJob = createAction(`${name} clearJobs`)

const JobsReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setJob, (state, action) => action.payload)
  builder.addCase(clearJob, (_state, _action) => INITIAL_STATE)
})

export default JobsReducer
