import { createAction, createReducer } from '@reduxjs/toolkit'

import {
  WorkExperience,
  WorkExperienceRequest,
  WorkExperienceResponse,
  WorkExperienceState,
} from './WorkExperience.types'

const name = '[Work Experiences]'
export const INITIAL_STATE = {
  id: '',
  title: '',
  description: '',
  createdAt: '',
  createdByAdmin: false,
  skills: [],
} as WorkExperienceState

export const setWorkExperience = createAction<WorkExperience>(`${name} setWorkExperience`)

export const createWorkExperience = createAction<WorkExperienceRequest>(`${name} createWorkExperience`)
export const createWorkExperienceSuccess = createAction<WorkExperienceResponse>(`${name} createWorkExperienceSuccess`)
export const createWorkExperienceFailure = createAction<string>(`${name} createWorkExperienceFailure`)

export const clearWorkExperiences = createAction(`${name} clearWorkExperience`)

const WorkExperienceReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setWorkExperience, (state, action) => action.payload)
  builder.addCase(clearWorkExperiences, (_state, _action) => INITIAL_STATE)
})

export default WorkExperienceReducer
