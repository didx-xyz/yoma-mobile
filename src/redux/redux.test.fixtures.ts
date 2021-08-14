import { createFixture } from '../../tests/tests.utils'
import { INITIAL_STATE as AUTH_INITIAL_STATE } from '../modules/Auth/Auth.reducer'
import { INITIAL_STATE as JOBS_INITIAL_STATE } from '../modules/Jobs/Jobs.reducer'
import { INITIAL_STATE as USER_INITIAL_STATE } from '../modules/User/User.reducer'
import { USER_CHALLENGES_STATE_KEY } from '../modules/UserChallenges/UserChallenges.constants'
import { INITIAL_STATE as USER_CHALLENGES_INITIAL_STATE } from '../modules/UserChallenges/UserChallenges.reducer'
import { INITIAL_STATE as USER_JOBS_INITIAL_STATE } from '../modules/UserJobs/UserJobs.reducer'
import { RootState } from './redux.types'

export const defaultRootState: RootState = {
  auth: AUTH_INITIAL_STATE,
  user: USER_INITIAL_STATE,
  jobs: JOBS_INITIAL_STATE,
  userJobs: USER_JOBS_INITIAL_STATE,
  [USER_CHALLENGES_STATE_KEY]: USER_CHALLENGES_INITIAL_STATE,
}

export const rootStateFixture = createFixture(defaultRootState)
