import { CourseFields } from './NewCourseForm.types'

export const INITIAL_VALUES: CourseFields = {
  course: '',
  courseHostProvider: '',
  description: '',
  id: '',
  startDate: null,
  endDate: null,
  skillNames: [],
}

export const MOCK_SKILLS_LIST = [
  { label: 'UI', value: 'UI' },
  { label: 'Design', value: 'Design' },
  { label: 'UX', value: 'UX' },
]
