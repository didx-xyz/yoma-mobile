import { Middleware } from 'redux'

import { actions as AuthActions } from '../Auth'
import { actions as CredentialsActions } from '../Credentials'
import { actions as OrganisationsActions } from '../Organisations'
import { actions as SkillsActions } from '../Skills'
import { actions as UserActions } from '../User'
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
