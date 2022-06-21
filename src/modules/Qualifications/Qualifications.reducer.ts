import { createAction } from '@reduxjs/toolkit'

import { FormFields as UserQualificationFormFields } from '~/modules/UserQualifications/Form/UserQualificationsForm.types'

import { Qualification } from './Qualifications.types'

const name = '[Qualifications]'

export const createQualification = createAction<UserQualificationFormFields>(`${name} createQualification`)
export const createQualificationSuccess = createAction<Qualification>(`${name} createQualificationSuccess`)
export const createQualificationFailure = createAction<string>(`${name} createQualificationFailure`)
