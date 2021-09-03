import { UserChallengeFormFields } from '../UserChallenges/UserChallenges.types'

export const INITIAL_FORM_VALUES: UserChallengeFormFields = {
  challenge: '',
  challengeHostProvider: '',
  description: '',
  id: '',
  startDate: null,
  endDate: null,
  skillNames: [],
}

export const MOCKED_CHALLENGES = [
  {
    id: 'id1',
    challenge: 'COVID Challenge',
    organisationLogoURL: '',
    challengeHostProvider: '',
    startDate: '03/01/2020',
    endDate: '04/05/2020',
    description: '',
  },
  {
    id: 'id2',
    challenge: 'Beyond your future challenge',
    organisationLogoURL: '',
    challengeHostProvider: '',
    startDate: '03/09/2020',
    endDate: '04/01/2020',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
  },
]

export const MOCK_SKILLS = [
  { label: 'UI', value: 'UI' },
  { label: 'Design', value: 'Design' },
  { label: 'UX', value: 'UX' },
]
