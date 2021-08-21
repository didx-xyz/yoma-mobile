import { createAction, createReducer } from '@reduxjs/toolkit'
import { UserCredentialFormValues } from 'modules/User/User.types'
import { updateNormalisedState, updateStateWithFormValues } from 'utils/redux.utils'

import { NormalisedUserJobs, UserJobCredential, UserJobsResponse, UserJobsState } from './UserJobs.types'

const name = '[User Jobs]'
export const INITIAL_STATE = {
  ids: [],
  entities: {},
} as UserJobsState

export const getUserJobsSuccess = createAction<UserJobCredential[]>(`${name} getUserJobsSuccess`)
export const normaliseUserJobsSuccess = createAction<NormalisedUserJobs>(`${name} normaliseUserJobsSuccess`)
export const updateNormalisedUserJobs = createAction<NormalisedUserJobs>(`${name} updateNormalisedUserJobs`)
export const setUserJobsFormValues = createAction<UserCredentialFormValues>(`${name} setUserJobsFormValues`)

export const createUserJob = createAction<any>(`${name} createUserJob`)
export const setUserJobs = createAction<NormalisedUserJobs>(`${name} setUserJobs`)
export const clearUserJobs = createAction(`${name} clearUserJobs`)

export const createUserJobSuccess = createAction<UserJobsResponse>(`${name} createUserJobSuccess`)
export const createUserJobFailure = createAction<string>(`${name} createUserJobFailure`)

const reducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setUserJobs, (_state, action) => action.payload)
  builder.addCase(setUserJobsFormValues, (state, action) => updateStateWithFormValues(state, action.payload))
  builder.addCase(updateNormalisedUserJobs, (state, action) => updateNormalisedState(state, action.payload))
  builder.addCase(clearUserJobs, (_state, _action) => INITIAL_STATE)
})

export default reducer
