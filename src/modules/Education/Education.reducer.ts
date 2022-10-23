import { createAction } from '@reduxjs/toolkit'

import { Education, FormFields } from './types'

const name = '[Education]'

export const createEducation = createAction<FormFields>(`${name} createQualification`)
export const createEducationSuccess = createAction<Education>(`${name} createQualificationSuccess`)
export const createEducationFailure = createAction<string>(`${name} createQualificationFailure`)
