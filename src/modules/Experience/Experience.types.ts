import { FormikValues } from 'formik'
import { JobOrganisationPayload } from 'modules/Job/Job.types'

export type ExperienceType = {
  endDate: string
  id: string
  job: JobOrganisationPayload
  startDate: string
}

export type ExperienceFormState = {
  values: FormikValues
  isValid: boolean
}
