import { UserJobsRequest } from '../UserJobs.types'

export const INITIAL_VALUES: UserJobsRequest = {
  title: '',
  description: '',
  language: 'en',
  organisationId: '',
  skillNames: [],
  startTime: null,
  endTime: null,
  published: false,
}
