import { createAction, createReducer } from '@reduxjs/toolkit'

import { Skill } from './Skills.types'

const name = '[Skills]'
export const INITIAL_STATE = [] as Array<Skill>
export const setSkills = createAction<any>(`${name} setSkills`)

export const fetchSkills = createAction(`${name} fetchSkills`)
export const fetchSkillsSuccess = createAction<any>(`${name} fetchSkillsSuccess`)
export const fetchSkillsFailure = createAction<string>(`${name} fetchSkillsFailure`)

const SkillsReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setSkills, (state, action) => state.concat(action.payload))
})

export default SkillsReducer
