import { ChallengeFields } from './NewChallengeForm.types'

export const INITIAL_VALUES: ChallengeFields = {
  challenge: '',
  challengeHostProvider: '',
  description: '',
  id: '',
  startDate: null,
  endDate: null,
  skillNames: [],
}

export const MOCK_SKILLS = [
  { label: 'UI', value: 'UI' },
  { label: 'Design', value: 'Design' },
  { label: 'UX', value: 'UX' },
]
