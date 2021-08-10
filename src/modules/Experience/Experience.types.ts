import { FormikValues } from 'formik'
import { JobOrganisationPayload } from 'modules/UserJobs/UserJobs.types'

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
