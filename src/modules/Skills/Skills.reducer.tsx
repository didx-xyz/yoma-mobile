import { createAction, createReducer } from '@reduxjs/toolkit'

import { Skills, SkillsState } from './Skills.types'

const name = '[Skills]'
export const INITIAL_STATE = {
  filteredSkills: [],
  skillEntities: [],
} as SkillsState

export const setSkillEntities = createAction<Skills[]>(`${name} setSkillEntities`)
export const setFilteredSkills = createAction<Skills[]>(`${name} setFilteredSkills`)

export const filterSkillsByName = createAction<string>(`${name} filterSkillsByName`)
export const fetchSkills = createAction(`${name} fetchSkills`)
export const fetchSkillsSuccess = createAction<any>(`${name} fetchSkillsSuccess`)
export const fetchSkillsFailure = createAction<string>(`${name} fetchSkillsFailure`)
export const clearSkills = createAction(`${name} clearSkills`)

const SkillsReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setSkillEntities, (state, action) => ({
    ...state,
    skillEntities: action.payload,
  }))
  builder.addCase(setFilteredSkills, (state, action) => ({
    ...state,
    filteredSkills: action.payload,
  }))
  builder.addCase(clearSkills, (_state, _action) => INITIAL_STATE)
})

export default SkillsReducer
