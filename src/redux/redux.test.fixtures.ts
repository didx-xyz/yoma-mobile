import { createFixture } from '../../tests/tests.utils'
import { INITIAL_STATE as AUTH_INITIAL_STATE } from '../modules/Auth/Auth.reducer'
import { INITIAL_STATE as ORGANISATIONS_INITIAL_STATE } from '../modules/Organisations/Organisations.reducer'
import { INITIAL_STATE as QUALIFICATIONS_INITIAL_STATE } from '../modules/Qualifications/Qualifications.reducer'
import { INITIAL_STATE as SKILLS_INITIAL_STATE } from '../modules/Skills/Skills.reducer'
import { INITIAL_STATE as USER_INITIAL_STATE } from '../modules/User/User.reducer'
import { INITIAL_STATE as USER_CREDENTIALS_INITIAL_STATE } from '../modules/UserCredentials/UserCredentials.reducer'
import { RootState } from './redux.types'

export const defaultRootState: RootState = {
  auth: AUTH_INITIAL_STATE,
  user: USER_INITIAL_STATE,
  userCredentials: USER_CREDENTIALS_INITIAL_STATE,
  qualifications: QUALIFICATIONS_INITIAL_STATE,
  organisations: ORGANISATIONS_INITIAL_STATE,
  skills: SKILLS_INITIAL_STATE,
}

export const rootStateFixture = createFixture(defaultRootState)
