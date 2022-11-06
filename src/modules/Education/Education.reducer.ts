import { createAction } from '@reduxjs/toolkit'

import { FormFields as UserEducationFormFields } from './Form/EducationForm.types'
import { Education } from './types'

const name = '[Education]'

export const createEducation = createAction<UserEducationFormFields>(`${name} createEducation`)
export const createEducationSuccess = createAction<Education>(`${name} createEducationSuccess`)
export const createEducationFailure = createAction<string>(`${name} createEducationFailure`)
