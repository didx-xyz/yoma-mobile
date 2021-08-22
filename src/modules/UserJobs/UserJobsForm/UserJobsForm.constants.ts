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

export const MOCKED_JOBS = [
  {
    job: {
      id: 'id',
      title: 'Job title',
      description: 'Job description',
      organisationLogoUrl: '',
    },
    startDate: '03/01/2020',
    endDate: '04/05/2020',
  },
  {
    job: {
      id: 'id2',
      title: 'Job title 2',
      description: 'Job description 2',
      organisationLogoUrl: '',
    },
    startDate: '03/01/2020',
    endDate: '04/05/2020',
  },
]

export const MOCK_SKILLS = [
  { key: 'UI', value: 'UI' },
  { key: 'Design', value: 'Design' },
  { key: 'UX', value: 'UX' },
]
export const MOCK_ORGANISATIONS = [
  { key: 'Org1', value: 'Org1' },
  { key: 'Org2', value: 'Org2' },
]
