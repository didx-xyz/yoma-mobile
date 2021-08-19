import { createAction, createReducer } from '@reduxjs/toolkit'

import {
  NormalisedUserJobs,
  UserJobCredential,
  UserJobsFormValues,
  UserJobsResponse,
  UserJobsState,
} from './UserJobs.types'

const name = '[User Jobs]'
export const INITIAL_STATE = {
  ids: [],
  entities: {},
  formValues: null,
} as UserJobsState

export const getUserJobsSuccess = createAction<UserJobCredential[]>(`${name} getUserJobsSuccess`)
export const normaliseUserJobsSuccess = createAction<NormalisedUserJobs>(`${name} normaliseUserJobsSuccess`)
export const updateNormalisedUserJobsState = createAction<NormalisedUserJobs>(`${name} updateNormalisedUserJobsState`)
export const setUserJobsFormValues = createAction<UserJobsFormValues>(`${name} setUserJobsFormValues`)
export const createUserJobs = createAction<any>(`${name} createUserJobs`)
export const setUserJobs = createAction<NormalisedUserJobs>(`${name} setUserJobs`)
export const clearUserJobs = createAction(`${name} clearUserJobs`)

export const createUserJobsSuccess = createAction<UserJobsResponse>(`${name} createUserJobsSuccess`)
export const createUserJobsFailure = createAction<string>(`${name} createUserJobsFailure`)

const reducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setUserJobs, (_state, action) => action.payload)
  builder.addCase(clearUserJobs, (_state, _action) => INITIAL_STATE)
})

export default reducer
