import { EducationFields } from './EducationForm.types'

export const INITIAL_VALUES: EducationFields = {
  school: '',
  description: '',
  qualificationType: '',
  id: '',
  startDate: null,
  endDate: null,
  country: '',
  skillNames: [],
  organisationId: '',
  organisationName: '',
}

export const MOCKED_SKILLS_DATA = [
  { label: 'UI', value: 'UI' },
  { label: 'Design', value: 'Design' },
  { label: 'UX', value: 'UX' },
]
