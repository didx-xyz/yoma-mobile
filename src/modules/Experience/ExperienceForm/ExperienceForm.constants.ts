import { JobRequestPayload } from 'modules/Job/Job.types'

//TODO: Review default values; language, url
export const INITIAL_VALUES: JobRequestPayload = {
  title: '',
  description: '',
  language: 'en',
  organisationId: '',
  skillNames: [],
  countries: [],
  startTime: '',
  endTime: '',
  published: false,
}
