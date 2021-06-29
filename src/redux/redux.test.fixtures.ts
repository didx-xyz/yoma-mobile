import { createFixture } from '../../tests/tests.utils'
import { INITIAL_STATE as AUTH_INITIAL_STATE } from '../modules/Auth/Auth.reducer'
import { RootState } from './redux.types'

const defaultRootState: RootState = {
  auth: AUTH_INITIAL_STATE,
}

export const rootStateFixture = createFixture(defaultRootState)
