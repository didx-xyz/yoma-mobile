import { createFixture } from '../../../tests/tests.utils'
import { Organisation } from './Organisations.types'

export const ORGANISATIONS_MOCK: Organisation[] = [
  {
    key: 'key1',
    value: 'value1',
  },
  {
    key: 'key2',
    value: 'value2',
  },
]
export const organisationsFixture = createFixture(ORGANISATIONS_MOCK)
