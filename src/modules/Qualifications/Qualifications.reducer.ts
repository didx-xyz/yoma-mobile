import { createAction } from '@reduxjs/toolkit'

import { FormFields as EducationFormFields } from '../Education/Form/EducationForm.types'
import { Qualification } from './Qualifications.types'

const name = '[Qualifications]'

export const createQualification = createAction<EducationFormFields>(`${name} createQualification`)
export const createQualificationSuccess = createAction<Qualification>(`${name} createQualificationSuccess`)
export const createQualificationFailure = createAction<string>(`${name} createQualificationFailure`)
