import { createAction, createReducer } from '@reduxjs/toolkit'

import { NormalisedUserJobs, UserJobCredential, UserJobsState } from './UserJobs.types'

const name = '[User Jobs]'
export const INITIAL_STATE = {
  ids: [],
  entities: {},
} as UserJobsState

export const getUserJobsSuccess = createAction<UserJobCredential[]>(`${name} getUserJobsSuccess`)
export const normaliseUserJobsSuccess = createAction<NormalisedUserJobs>(`${name} normaliseUserJobsSuccess`)
export const setUserJobs = createAction<NormalisedUserJobs>(`${name} setUserJobs`)
export const clearUserJobs = createAction(`${name} clearUserJobs`)

const reducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setUserJobs, (_state, action) => action.payload)
  builder.addCase(clearUserJobs, (_state, _action) => INITIAL_STATE)
})

export default reducer
