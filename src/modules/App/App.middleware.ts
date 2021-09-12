import { Middleware } from 'redux'

// avoiding circular dependencies:
import * as AuthActions from '../Auth/Auth.reducer'
import * as ChallengesActions from '../Challenges/Challenges.reducer'
import * as OrganisationsActions from '../Organisations/Organisations.reducer'
import * as SkillsActions from '../Skills/Skills.reducer'
import * as UserActions from '../User/User.reducer'
import * as UserChallengesActions from '../UserChallenges/UserChallenges.reducer'
import * as UserJobsActions from '../UserJobs/UserJobs.reducer'
import * as UserQualificationsActions from '../UserQualifications/UserQualifications.reducer'
import * as UserSkillsActions from '../UserSkills/UserSkills.reducer'
import { hydrateApp, resetAppData } from './App.reducer'

export const appResetFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (resetAppData.match(action)) {
      dispatch(AuthActions.clearAuth())
      dispatch(UserActions.clearUser())
      dispatch(UserChallengesActions.clearUserChallenges())
      dispatch(UserJobsActions.clearUserJobs())
      dispatch(UserQualificationsActions.clearUserQualifications())
      dispatch(UserSkillsActions.clearUserSkills())
    }

    return result
  }

export const hydrateAppFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (hydrateApp.match(action)) {
      dispatch(ChallengesActions.fetchChallenges())
      dispatch(OrganisationsActions.fetchOrganisations())
      dispatch(SkillsActions.fetchSkills())
      dispatch(UserActions.fetchUserCredentials())
      dispatch(UserSkillsActions.fetchUserSkills())
    }
    return result
  }
