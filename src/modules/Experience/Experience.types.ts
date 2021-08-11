import { UserJobsOrganisation } from 'modules/UserJobs/UserJobs.types'

export type ExperienceType = {
  endDate: string
  id: string
  job: UserJobsOrganisation
  startDate: string
}
