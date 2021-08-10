import { createAction, createReducer } from '@reduxjs/toolkit'
import { UserCredentialPayload, UserCredentialRequestPayload } from 'modules/User/User.types'
import { mergeRight } from 'ramda'

import {
  UserJobsCredentialsTmpFormValues,
  UserJobsRequestPayload,
  UserJobsResponsePayload,
  UserJobsState,
} from './UserJobs.types'

const name = '[UserJobs]'
export const INITIAL_STATE = {
  tmpFormValues: {},
  jobEntities: {},
} as UserJobsState

export const setUserJobsEntities = createAction<any>(`${name} setUserJobsEntities`)
export const setTmpFormValues = createAction<UserJobsCredentialsTmpFormValues>(`${name} setTmpFormValues`)

export const createUserJobs = createAction<UserJobsRequestPayload>(`${name} createUserJobs`)
export const createUserJobsSuccess = createAction<UserJobsResponsePayload>(`${name} createUserJobsSuccess`)
export const createUserJobsFailure = createAction<string>(`${name} createUserJobsFailure`)

export const createUserJobsCredentials = createAction<UserCredentialRequestPayload>(`${name} createUserJobsCredentials`)
export const createUserJobsCredentialsSuccess = createAction<string>(`${name} createUserJobsCredentialsSuccess`)
export const createUserJobsCredentialsFailure = createAction<string>(`${name} createUserJobsCredentialsFailure`)

export const updateUserJobs = createAction<UserJobsRequestPayload>(`${name} updateUserJobs`)
export const updateUserJobsSuccess = createAction<UserJobsResponsePayload>(`${name} updateUserJobsSuccess`)
export const updateUserJobsFailure = createAction<string>(`${name} updateUserJobsFailure`)

export const fetchUserJobsCredentialById = createAction<any>(`${name} fetchUserJobsCredentialById`)
export const updateUserJobsCredentials = createAction<UserCredentialPayload>(`${name} updateUserJobsCredentials`)
export const updateUserJobsCredentialsSuccess = createAction<string>(`${name} updateUserJobsCredentialsSuccess`)
export const updateUserJobsCredentialsFailure = createAction<string>(`${name} updateUserJobsCredentialsFailure`)

export const clearUserJobs = createAction(`${name} clearUserJobs`)

const UserJobsReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setUserJobsEntities, (state, action) => ({
    ...state,
    jobEntities: mergeRight(state.jobEntities)(action.payload),
  }))
  builder.addCase(setTmpFormValues, (state, action) => ({
    ...state,
    tmpFormValues: mergeRight(state.tmpFormValues)(action.payload),
  }))
  builder.addCase(clearUserJobs, (_state, _action) => INITIAL_STATE)
})

export default UserJobsReducer
