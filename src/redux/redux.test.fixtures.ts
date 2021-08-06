import { createFixture } from '../../tests/tests.utils'
import { INITIAL_STATE as AUTH_INITIAL_STATE } from '../modules/Auth/Auth.reducer'
import { INITIAL_STATE as JOBS_INITIAL_STATE } from '../modules/Job/Job.reducer'
import { INITIAL_STATE as USER_INITIAL_STATE } from '../modules/User/User.reducer'
import { RootState } from './redux.types'

export const defaultRootState: RootState = {
  auth: AUTH_INITIAL_STATE,
  user: USER_INITIAL_STATE,
  job: JOBS_INITIAL_STATE,
}

export const rootStateFixture = createFixture(defaultRootState)
