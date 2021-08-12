import { createFixture } from '../../../tests/tests.utils'
import { SkillsState } from './Skills.types'

export const SKILLS_STATE_MOCK: SkillsState = {
  filtered: [],
  allValues: ['VALUE', 'VALUE1'],
  allKeys: ['KEY', 'KEY1'],
  byValue: {
    VALUE: {
      key: 'KEY',
      value: 'VALUE',
    },
    VALUE1: {
      key: 'KEY1',
      value: 'VALUE1',
    },
  },
  byKey: {
    KEY: {
      key: 'KEY',
      value: 'VALUE',
    },
    KEY1: {
      key: 'KEY1',
      value: 'VALUE1',
    },
  },
}
export const skillsFixture = createFixture(SKILLS_STATE_MOCK)
