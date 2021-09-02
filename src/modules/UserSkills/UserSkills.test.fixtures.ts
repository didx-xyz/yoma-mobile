import { createFixture } from '../../../tests/tests.utils'
import { NormalisedUserSkills } from './UserSkills.types'

export const USER_SKILLS_MOCK: NormalisedUserSkills = {
  ids: [],
  entities: {
    Skill: {
      skillName: 'Skill',
      verifiedBy: {
        name: 'Name',
        logoUrl: 'Url',
      },
    },
  },
}

export const skillsFixture = createFixture(USER_SKILLS_MOCK)
