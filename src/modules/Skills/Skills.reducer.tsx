import { createAction, createReducer } from '@reduxjs/toolkit'

const name = '[Skills]'
export const INITIAL_STATE = [] as any
export const setSkills = createAction<any>(`${name} setSkills`)

export const fetchSkills = createAction(`${name} fetchSkills`)
export const fetchSkillsSuccess = createAction<any>(`${name} fetchSkillsSuccess`)
export const fetchSkillsFailure = createAction<string>(`${name} fetchSkillsFailure`)

const SkillsReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setSkills, (_, action) => action.payload)
})

export default SkillsReducer
