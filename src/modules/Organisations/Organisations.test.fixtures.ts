import { createFixture } from '../../../tests/tests.utils'
import { Organisation } from './Organisations.types'

export const SKILLS_MOCK: Organisation[] = [
  {
    key: 'key1',
    value: 'value1',
  },
  {
    key: 'key2',
    value: 'value2',
  },
]
export const organisationsFixture = createFixture(SKILLS_MOCK)
