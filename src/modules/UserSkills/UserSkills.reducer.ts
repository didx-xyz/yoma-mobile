import { createAction, createReducer } from '@reduxjs/toolkit'
import { concat } from 'ramda'

import { UserSkill, UserSkillsResponse, UserSkillsState } from './UserSkills.types'

const name = '[User Skills]'
export const INITIAL_STATE = [] as UserSkillsState

export const setUserSkills = createAction<UserSkill[]>(`${name} setUserSkills`)
export const clearUserSkills = createAction(`${name} clearUserSkills`)

export const createUserSkill = createAction<string[]>(`${name} createUserSkill`)
export const createUserSkillSuccess = createAction<UserSkillsResponse>(`${name} createUserSkillSuccess`)
export const createUserSkillFailure = createAction<string>(`${name} createUserSkillFailure`)

const UserSkillsReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setUserSkills, (state, action) => concat(state, action.payload))
  builder.addCase(clearUserSkills, (_state, _action) => INITIAL_STATE)
})

export default UserSkillsReducer
