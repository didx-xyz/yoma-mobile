import { UserJobFormFields } from '~/modules/UserJobs/UserJobs.types'

export const INITIAL_VALUES: UserJobFormFields = {
  title: '',
  description: '',
  language: 'en',
  organisationId: '',
  skillNames: [],
  startTime: null,
  endTime: null,
  published: false,
}
