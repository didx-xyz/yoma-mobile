import { createFixture } from 'tests/tests.utils'

import { INITIAL_STATE as AUTH_INITIAL_STATE } from '~/modules/Auth/Auth.reducer'
import { INITIAL_STATE as CHALLENGES_INITIAL_STATE } from '~/modules/Challenges/Challenges.reducer'
import { INITIAL_STATE as COUNTRIES_INITIAL_STATE } from '~/modules/Countries/Countries.reducer'
import { INITIAL_STATE as JOBS_INITIAL_STATE } from '~/modules/Jobs/Jobs.reducer'
import { INITIAL_STATE as OPPORTUNITIES_INITIAL_STATE } from '~/modules/Opportunities/Opportunities.reducer'
import { INITIAL_STATE as ORGANISATIONS_INITIAL_STATE } from '~/modules/Organisations/Organisations.reducer'
import { INITIAL_STATE as SKILLS_INITIAL_STATE } from '~/modules/Skills/Skills.reducer'
import { INITIAL_STATE as USER_INITIAL_STATE } from '~/modules/User/User.reducer'
import { INITIAL_STATE as USER_CHALLENGES_INITIAL_STATE } from '~/modules/UserChallenges/UserChallenges.reducer'
import { INITIAL_STATE as USER_JOBS_INITIAL_STATE } from '~/modules/UserJobs/UserJobs.reducer'
import { INITIAL_STATE as USER_QUALIFICATIONS_INITIAL_STATE } from '~/modules/UserQualifications/UserQualifications.reducer'
import { INITIAL_STATE as USER_SKILLS_INITIAL_STATE } from '~/modules/UserSkills/UserSkills.reducer'

import { RootState } from './redux.types'

export const defaultRootState: RootState = {
  auth: AUTH_INITIAL_STATE,
  challenges: CHALLENGES_INITIAL_STATE,
  countries: COUNTRIES_INITIAL_STATE,
  jobs: JOBS_INITIAL_STATE,
  organisations: ORGANISATIONS_INITIAL_STATE,
  opportunities: OPPORTUNITIES_INITIAL_STATE,
  skills: SKILLS_INITIAL_STATE,
  user: USER_INITIAL_STATE,
  userChallenges: USER_CHALLENGES_INITIAL_STATE,
  userJobs: USER_JOBS_INITIAL_STATE,
  userQualifications: USER_QUALIFICATIONS_INITIAL_STATE,
  userSkills: USER_SKILLS_INITIAL_STATE,
}

export const rootStateFixture = createFixture(defaultRootState)
