import { createAction, createReducer } from '@reduxjs/toolkit'

import { NormalisedUserSkills, UserSkillsResponse, UserSkillsState } from './UserSkills.types'

const name = '[User Skills]'
export const INITIAL_STATE = {} as UserSkillsState

export const createUserSkill = createAction<any>(`${name} createUserSkill`)
export const setUserSkills = createAction<NormalisedUserSkills>(`${name} setUserSkills`)
export const clearUserSkills = createAction(`${name} clearUserSkills`)

export const createUserSkillSuccess = createAction<UserSkillsResponse>(`${name} createUserSkillSuccess`)
export const createUserSkillFailure = createAction<string>(`${name} createUserSkillFailure`)

const reducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setUserSkills, (_state, action) => action.payload)
  builder.addCase(clearUserSkills, (_state, _action) => INITIAL_STATE)
})

export default reducer
