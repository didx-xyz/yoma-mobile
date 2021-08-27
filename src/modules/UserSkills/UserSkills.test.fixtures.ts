import { createFixture } from '../../../tests/tests.utils'
import { UserSkill } from './UserSkills.types'

export const USER_SKILLS_MOCK: UserSkill[] = [
  {
    skillName: 'Skill',
    verifiedBy: {
      name: 'Name',
      logoUrl: 'Url',
    },
  },
]

export const skillsFixture = createFixture(USER_SKILLS_MOCK)
