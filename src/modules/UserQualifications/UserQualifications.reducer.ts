import { createAction, createReducer } from '@reduxjs/toolkit'

import { NormalisedUserQualifications, UserQualification, UserQualificationsState } from './UserQualifications.types'

const name = '[User: Qualifications]'
export const INITIAL_STATE = {
  ids: [],
  entities: {},
} as UserQualificationsState

export const getUserQualificationsSuccess = createAction<UserQualification[]>(`${name} getUserQualificationsSuccess`)
export const normaliseUserQualificationsSuccess = createAction<NormalisedUserQualifications>(
  `${name} normaliseUserQualificationsSuccess`,
)
export const setUserQualifications = createAction<NormalisedUserQualifications>(`${name} setUserQualifications`)
export const clearUserQualifications = createAction(`${name} clearUserQualifications`)

const reducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setUserQualifications, (_state, action) => action.payload)
  builder.addCase(clearUserQualifications, (_state, _action) => INITIAL_STATE)
})

export default reducer
