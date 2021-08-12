import { createAction, createReducer } from '@reduxjs/toolkit'
import { normaliseByKey, normaliseByValue } from 'utils/redux.utils'

import { NormalisedSkillsState, SkillsState } from './Skills.types'

const name = '[Skills]'
export const INITIAL_STATE = {
  filtered: [],
  allValues: [],
  allKeys: [],
  byValue: {},
  byKey: {},
} as SkillsState

export const setSkillEntities = createAction<NormalisedSkillsState>(`${name} setSkillEntities`)
export const setFilteredSkills = createAction<string[]>(`${name} setFilteredSkills`)

export const filterSkillsByName = createAction<string>(`${name} filterSkillsByName`)
export const fetchSkills = createAction(`${name} fetchSkills`)
export const fetchSkillsSuccess = createAction<any>(`${name} fetchSkillsSuccess`)
export const fetchSkillsFailure = createAction<string>(`${name} fetchSkillsFailure`)
export const clearSkills = createAction(`${name} clearSkills`)

const SkillsReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setSkillEntities, (state, action) => ({
    ...state,
    ...normaliseByKey(action.payload),
    ...normaliseByValue(action.payload),
  }))
  builder.addCase(setFilteredSkills, (state, action) => ({
    ...state,
    filtered: action.payload,
  }))
  builder.addCase(clearSkills, (_state, _action) => INITIAL_STATE)
})

export default SkillsReducer
