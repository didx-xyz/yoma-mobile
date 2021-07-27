import { QualificationRequestPayload } from 'modules/Qualifications/Qualifications.types'

//TODO: Review default values; language, url
export const INITIAL_VALUES: QualificationRequestPayload = {
  title: '',
  description: '',
  url: 'none',
  language: 'en',
  organisationId: '',
  skillNames: [],
  country: '',
  startTime: '',
  endTime: '',
  published: false,
}
