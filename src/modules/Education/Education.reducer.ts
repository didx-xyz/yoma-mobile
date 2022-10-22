import { createAction } from '@reduxjs/toolkit'

import { FormFields as UserQualificationFormFields } from '~/modules/UserQualifications/Form/UserQualificationsForm.types'

import { Education } from './Education.types'

const name = '[Qualifications]'

export const createQualification = createAction<UserQualificationFormFields>(`${name} createQualification`)
export const createQualificationSuccess = createAction<Education>(`${name} createQualificationSuccess`)
export const createQualificationFailure = createAction<string>(`${name} createQualificationFailure`)
