import { Middleware } from 'redux'

// avoiding circular dependencies:
import * as AuthActions from '~/modules/Auth/Auth.reducer'
import * as ChallengesActions from '~/modules/Challenges/Challenges.reducer'
import * as CountriesActions from '~/modules/Countries/Countries.reducer'
import * as OrganisationsActions from '~/modules/Organisations/Organisations.reducer'
import * as SkillsActions from '~/modules/Skills/Skills.reducer'
import * as UserActions from '~/modules/User/User.reducer'
import * as UserChallengesActions from '~/modules/UserChallenges/UserChallenges.reducer'
import * as UserQualificationsActions from '~/modules/UserQualifications/UserQualifications.reducer'
import * as UserSkillsActions from '~/modules/UserSkills/UserSkills.reducer'
import * as UserWorkExperienceActions from '~/modules/UserWorkExperience/UserWorkExperience.reducer'

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
      dispatch(UserWorkExperienceActions.clearUserWorkExperiences())
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
      dispatch(CountriesActions.getCountries())
      dispatch(ChallengesActions.fetchChallenges())
      dispatch(OrganisationsActions.fetchOrganisations())
      dispatch(SkillsActions.fetchSkills())
    }
    return result
  }
