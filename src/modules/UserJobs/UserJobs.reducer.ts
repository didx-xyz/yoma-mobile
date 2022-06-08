import { createAction, createReducer } from '@reduxjs/toolkit'
import { mergeRight } from 'ramda'

import { UserCredentialFormValues } from '~/modules/User/User.types'
import { updateNormalisedReducer } from '~/redux/redux.utils'

import { Job } from '../Jobs/Jobs.types'
import { setFormValues } from '../User/User.utils'
import { NormalisedUserJobs, UserJobCredential, UserJobsResponse, UserJobsState } from './UserJobs.types'

const name = '[User: Jobs]'
export const INITIAL_STATE = {
  ids: [],
  entities: {},
  formValues: {},
} as UserJobsState

export const getUserJobsSuccess = createAction<UserJobCredential[]>(`${name} getUserJobsSuccess`)
export const normaliseUserJobsSuccess = createAction<NormalisedUserJobs>(`${name} normaliseUserJobsSuccess`)

export const fetchUserJobById = createAction<string>(`${name} fetchUserJobById`)
export const fetchUserJobByIdFailure = createAction<string>(`${name} fetchUserJobByIdFailure`)
export const fetchUserJobByIdSuccess = createAction<any>(`${name} fetchUserJobByIdSuccess`)

export const createUserJob = createAction<Job>(`${name} createUserJob`)
export const createUserJobSuccess = createAction<UserJobsResponse>(`${name} createUserJobSuccess`)
export const createUserJobFailure = createAction<string>(`${name} createUserJobFailure`)

export const setUserJobs = createAction<NormalisedUserJobs>(`${name} setUserJobs`)
export const updateUserJobs = createAction<NormalisedUserJobs>(`${name} updateUserJobs`)
export const clearUserJobs = createAction(`${name} clearUserJobs`)
export const setUserJobsFormValues = createAction<UserCredentialFormValues>(`${name} setUserJobsFormValues`)
export const clearUserJobsFormValues = createAction(`${name} clearUserJobsFormValues`)

const reducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setUserJobs, (state, action) => mergeRight({ formValues: state.formValues }, action.payload))
  builder.addCase(updateUserJobs, updateNormalisedReducer)
  builder.addCase(clearUserJobs, (_state, _action) => INITIAL_STATE)
  builder.addCase(setUserJobsFormValues, (state, action) => setFormValues(state, action.payload))
  builder.addCase(clearUserJobsFormValues, (state, _action) => mergeRight(state, { formValues: {} }))
})

export default reducer
