import { createAction } from '@reduxjs/toolkit'

import { FormFields as UserQualificationFormFields } from '~/modules/UserQualifications/Form/UserQualificationsForm.types'

import { Education } from './types'

const name = '[Education]'

export const createEducation = createAction<UserQualificationFormFields>(`${name} createEducation`)
export const createEducationSuccess = createAction<Education>(`${name} createEducationSuccess`)
export const createEducationFailure = createAction<string>(`${name} createEducationFailure`)
