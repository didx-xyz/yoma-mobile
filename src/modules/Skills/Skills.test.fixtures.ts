import { createFixture } from '../../../tests/tests.utils'
import { Skill } from './Skills.types'

export const SKILLS_MOCK: Skill[] = [
  {
    key: 'key1',
    value: 'value1',
  },
  {
    key: 'key2',
    value: 'value2',
  },
]
export const skillsFixture = createFixture(SKILLS_MOCK)
