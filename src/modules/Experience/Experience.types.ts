import { FormikValues } from 'formik'

export type ExperienceType = {
  endDate: string
  id: string
  job: any
  startDate: string
}

export type ExperienceFormState = {
  values: FormikValues
  isValid: boolean
}
