import { createAction, createReducer } from '@reduxjs/toolkit'

import { NormalisedSkills, Skill, SkillsResponse, SkillsState } from './Skills.types'

const name = '[Skills]'
export const INITIAL_STATE = {
  filtered: [],
  ids: [],
  entities: {},
} as SkillsState

export const setSkills = createAction<NormalisedSkills>(`${name} setSkills`)
export const getSkillsSuccess = createAction<Skill[]>(`${name} getSkillsSuccess`)
export const normaliseSkillsSuccess = createAction<NormalisedSkills>(`${name} normaliseSkillsSuccess`)
export const setFilteredSkills = createAction<any>(`${name} setFilteredSkills`)

export const filterSkillsByName = createAction<string>(`${name} filterSkillsByName`)
export const fetchSkills = createAction(`${name} fetchSkills`)
export const fetchSkillsSuccess = createAction<SkillsResponse>(`${name} fetchSkillsSuccess`)
export const fetchSkillsFailure = createAction<string>(`${name} fetchSkillsFailure`)
export const clearSkills = createAction(`${name} clearSkills`)

const SkillsReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setSkills, (_state, action) => action.payload)
  builder.addCase(setFilteredSkills, (_state, action) => action.payload)
  builder.addCase(clearSkills, (_state, _action) => INITIAL_STATE)
})

export default SkillsReducer
