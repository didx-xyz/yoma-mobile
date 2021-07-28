import { Middleware } from 'redux'

import * as OrganisationsActions from '../Organisations/Organisations.reducer'
import * as SkillsActions from '../Skills/Skills.reducer'
import * as UserCredentialsActions from '../UserCredentials/UserCredentials.reducer'
// avoiding circular dependencies:
import * as AuthActions from './../Auth/Auth.reducer'
import * as UserActions from './../User/User.reducer'
import { hydrateApp, resetAppData } from './App.reducer'

export const appResetFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (resetAppData.match(action)) {
      dispatch(AuthActions.clearAuth())
      dispatch(UserActions.clearUser())
      dispatch(UserCredentialsActions.clearUserCredentials())
      dispatch(SkillsActions.clearSkills())
    }

    return result
  }

export const hydrateAppFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (hydrateApp.match(action)) {
      dispatch(UserCredentialsActions.fetchUserCredentials())
      dispatch(OrganisationsActions.fetchOrganisations())
      dispatch(SkillsActions.fetchSkills())
    }
    return result
  }
