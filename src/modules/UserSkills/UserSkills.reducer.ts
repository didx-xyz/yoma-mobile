import { createAction, createReducer } from '@reduxjs/toolkit'

import { NormalisedUserSkills, UserSkillsResponse, UserSkillsState } from './UserSkills.types'

const name = '[User: Skills]'
export const INITIAL_STATE = {
  ids: [],
  entities: {},
} as UserSkillsState

export const fetchUserSkills = createAction(`${name} fetchUserSkills`)
export const fetchUserSkillsSuccess = createAction<UserSkillsResponse>(`${name} fetchUserSkillsSuccess`)
export const fetchUserSkillsFailure = createAction<string>(`${name} fetchUserSkillsFailure`)

export const addUserSkills = createAction(`${name} addUserSkills`)
export const addUserSkillsSuccess = createAction(`${name} addUserSkillsSuccess`)
export const addUserSkillsFailure = createAction(`${name} addUserSkillsFailure`)

export const setUserSkills = createAction<NormalisedUserSkills>(`${name} setUserSkills`)
export const clearUserSkills = createAction(`${name} clearUserSkills`)

const UserSkillsReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setUserSkills, (_state, action) => action.payload)
  builder.addCase(clearUserSkills, (_state, _action) => INITIAL_STATE)
})

export default UserSkillsReducer
