import { UserJobsOrganisationPayload } from 'modules/UserJobs/UserJobs.types'

export type ExperienceType = {
  endDate: string
  id: string
  job: UserJobsOrganisationPayload
  startDate: string
}
