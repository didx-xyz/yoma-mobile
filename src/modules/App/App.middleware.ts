import { Middleware } from 'redux'

import * as AuthActions from '../Auth/Auth.reducer'
import * as JobActions from '../Jobs/Jobs.reducer'
// avoiding circular dependencies:
import * as SkillsActions from '../Skills/Skills.reducer'
import * as UserActions from '../User/User.reducer'
import * as UserChallengesActions from '../UserChallenges/UserChallenges.reducer'
import { hydrateApp, resetAppData } from './App.reducer'

export const appResetFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (resetAppData.match(action)) {
      dispatch(AuthActions.clearAuth())
      dispatch(UserActions.clearUser())
      dispatch(SkillsActions.clearSkills())
      dispatch(JobActions.clearJob())
      dispatch(UserChallengesActions.clearUserChallenges())
    }

    return result
  }

export const hydrateAppFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (hydrateApp.match(action)) {
      dispatch(UserActions.fetchUserCredentials())
      dispatch(SkillsActions.fetchSkills())
    }
    return result
  }
