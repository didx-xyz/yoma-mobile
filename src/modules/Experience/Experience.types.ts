import { JobOrganisationPayload, JobRequestPayload } from 'modules/Job/Job.types'

export type ExperienceType = {
  endDate: string
  id: string
  job: JobOrganisationPayload
  startDate: string
}

export type ExperienceFormState = {
  values: JobRequestPayload
  isValid: boolean
}
