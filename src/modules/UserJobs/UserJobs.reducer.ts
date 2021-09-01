import { createAction, createReducer } from '@reduxjs/toolkit'
import { UserCredentialFormValues } from 'modules/User/User.types'
import { mergeDeepRight, mergeRight } from 'ramda'
import { updateNormalisedState, updateStateWithFormValues } from 'utils/redux.utils'

import { NormalisedUserJobs, UserJobCredential, UserJobsResponse, UserJobsState } from './UserJobs.types'

const name = '[User Jobs]'
export const INITIAL_STATE = {
  ids: [],
  entities: {},
  formValues: {},
} as UserJobsState

export const getUserJobsSuccess = createAction<UserJobCredential[]>(`${name} getUserJobsSuccess`)
export const normaliseUserJobsSuccess = createAction<NormalisedUserJobs>(`${name} normaliseUserJobsSuccess`)
export const updateUserJobs = createAction<NormalisedUserJobs>(`${name} updateUserJobs`)

export const setUserJobsFormValues = createAction<UserCredentialFormValues>(`${name} setUserJobsFormValues`)
export const clearUserJobsFormValues = createAction(`${name} clearUserJobsFormValues`)

export const fetchUserJobById = createAction<string>(`${name} fetchUserJobById`)
export const fetchUserJobByIdSuccess = createAction<any>(`${name} fetchUserJobByIdSuccess`)

export const fetchUserJobByIdFailure = createAction<string>(`${name} fetchUserJobByIdFailure`)
export const createUserJob = createAction<any>(`${name} createUserJob`)
export const setUserJobs = createAction<NormalisedUserJobs>(`${name} setUserJobs`)
export const clearUserJobs = createAction(`${name} clearUserJobs`)

export const createUserJobSuccess = createAction<UserJobsResponse>(`${name} createUserJobSuccess`)
export const createUserJobFailure = createAction<string>(`${name} createUserJobFailure`)

const reducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setUserJobs, (state, action) => mergeDeepRight({ formValues: state.formValues }, action.payload))
  builder.addCase(updateUserJobs, (state, action) => updateNormalisedState(state, action.payload))
  builder.addCase(clearUserJobs, (_state, _action) => INITIAL_STATE)
  builder.addCase(setUserJobsFormValues, (state, action) => updateStateWithFormValues(state, action.payload))
  builder.addCase(clearUserJobsFormValues, (state, _action) => mergeRight(state, { formValues: {} }))
})

export default reducer
