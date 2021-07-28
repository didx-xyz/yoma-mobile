import { createAction, createReducer } from '@reduxjs/toolkit'

const name = '[Skills]'
export const INITIAL_STATE = [] as any
export const setSkills = createAction<any>(`${name} setSkills`)

export const fetchSkills = createAction(`${name} fetchSkills`)
export const fetchSkillsSuccess = createAction<any>(`${name} fetchSkillsSuccess`)
export const fetchSkillsFailure = createAction<string>(`${name} fetchSkillsFailure`)
export const clearSkills = createAction(`${name} clearSkills`)

const SkillsReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setSkills, (_, action) => action.payload)
  builder.addCase(clearSkills, (_state, _action) => INITIAL_STATE)
})

export default SkillsReducer
