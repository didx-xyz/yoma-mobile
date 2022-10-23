import { createAction } from '@reduxjs/toolkit'

import { WorkExperienceRequest, WorkExperienceResponse } from './WorkExperience.types'

const name = '[Work Experiences]'

export const createWorkExperience = createAction<WorkExperienceRequest>(`${name} createWorkExperience`)
export const createWorkExperienceSuccess = createAction<WorkExperienceResponse>(`${name} createWorkExperienceSuccess`)
export const createWorkExperienceFailure = createAction<string>(`${name} createWorkExperienceFailure`)
