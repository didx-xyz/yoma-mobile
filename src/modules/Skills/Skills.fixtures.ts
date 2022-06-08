import { createFixture } from '~/../tests/tests.utils'

import { INITIAL_STATE } from './Skills.reducer'
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
export const skillsInitialStateFixture = createFixture(INITIAL_STATE)
