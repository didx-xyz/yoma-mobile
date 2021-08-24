import { UserJobFormFields } from '../UserJobs.types'

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
export const MOCK_SKILLS = [
  { key: 'UI', value: 'UI' },
  { key: 'Design', value: 'Design' },
  { key: 'UX', value: 'UX' },
]
export const MOCK_ORGANISATIONS = [
  { key: 'Org1', value: 'Org1' },
  { key: 'Org2', value: 'Org2' },
]
