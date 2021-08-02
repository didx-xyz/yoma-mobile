import { FormikValues } from 'formik'

export type ExperienceType = {
  endDate: string
  id: string
  job: Job
  startDate: string
}

type Job = {
  description: string
  id: string
  organisationId: string
  organisationLogoURL: string
  organisationName: string
  title: string
}
export type ExperienceFormState = {
  values: FormikValues
  isValid: boolean
}
