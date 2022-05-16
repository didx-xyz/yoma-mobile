import { createAction, createReducer } from '@reduxjs/toolkit'

import * as ReduxUtils from '~/redux/redux.utils'

import { NormalisedUserSkills, SkillAdded, UserSkillsResponse, UserSkillsState } from './UserSkills.types'

const name = '[User: Skills]'
export const INITIAL_STATE = {
  ids: [],
  entities: {},
} as UserSkillsState

export const fetchUserSkills = createAction(`${name} fetchUserSkills`)
export const fetchUserSkillsSuccess = createAction<UserSkillsResponse>(`${name} fetchUserSkillsSuccess`)
export const fetchUserSkillsFailure = createAction<string>(`${name} fetchUserSkillsFailure`)

export const addUserSkills = createAction<SkillAdded[]>(`${name} addUserSkills`)
export const addUserSkillsSuccess = createAction(`${name} addUserSkillsSuccess`)
export const addUserSkillsFailure = createAction(`${name} addUserSkillsFailure`)

export const setUserSkills = createAction<NormalisedUserSkills>(`${name} setUserSkills`)
export const updateUserSkills = createAction<NormalisedUserSkills>(`${name} updateUserSkills`)
export const clearUserSkills = createAction(`${name} clearUserSkills`)

const UserSkillsReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setUserSkills, (_state, action) => action.payload)
  builder.addCase(updateUserSkills, ReduxUtils.updateNormalisedReducer)
  builder.addCase(clearUserSkills, (_state, _action) => INITIAL_STATE)
})

export default UserSkillsReducer
