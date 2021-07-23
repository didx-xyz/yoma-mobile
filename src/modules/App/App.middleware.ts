import { Middleware } from 'redux'

import * as CredentialsActions from '../Credentials/Credentials.reducer'
import * as OrganisationsActions from '../Organisations/Organisations.reducer'
import * as SkillsActions from '../Skills/Skills.reducer'
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
    }

    return result
  }

export const hydrateAppFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (hydrateApp.match(action)) {
      dispatch(CredentialsActions.fetchUserCredentials())
      dispatch(OrganisationsActions.fetchOrganisations())
      dispatch(SkillsActions.fetchSkills())
    }
    return result
  }
