import i18n from 'i18next'
import { mergeRight, pipe } from 'ramda'
import { Middleware } from 'redux'

import { actions as ApiActions } from '~/api'
import { constants as ApiUsersConstants } from '~/api/users'
import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'
import * as NavigationUtils from '~/modules/Navigation/Navigation.utils'
import { addSkillCountToSkillsAndDedupe } from '~/modules/UserSkills/UserSkills.utils'
import * as ReduxUtils from '~/redux/redux.utils'
import { showSimpleMessage } from '~/utils/error'

import {
  addUserSkills,
  addUserSkillsFailure,
  addUserSkillsSuccess,
  fetchUserSkills,
  fetchUserSkillsFailure,
  fetchUserSkillsSuccess,
  setUserSkills,
} from './UserSkills.reducer'
import { UserSkillKeys } from './UserSkills.types'

export const fetchUserSkillsFlow: Middleware =
  ({ dispatch, getState }) =>
  next =>
  action => {
    const result = next(action)
    if (fetchUserSkills.match(action)) {
      const config = ReduxUtils.buildConfig(ApiUsersConstants.USERS_SKILLS_GET_BY_ID_CONFIG, getState())

      dispatch(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: fetchUserSkillsSuccess,
            onFailure: fetchUserSkillsFailure,
          }),
        ),
      )
    }
    return result
  }

export const fetchUserSkillsSuccessFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (fetchUserSkillsSuccess.match(action)) {
      const skills = pipe(
        ReduxUtils.extractDataFromResponseAction,
        addSkillCountToSkillsAndDedupe,
        ReduxUtils.normaliseFn(UserSkillKeys.SkillName),
      )(action)

      dispatch(setUserSkills(skills))
    }
    return result
  }

export const fetchUserSkillsFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (fetchUserSkillsFailure.match(action)) {
      notification('danger', i18n.t('general.errorOccurred'), i18n.t('general.errorMessageTryAgain'))
    }
    return result
  }

export const addUserSkillsFlow: Middleware =
  ({ dispatch, getState }) =>
  next =>
  action => {
    const result = next(action)
    if (addUserSkills.match(action)) {
      const config = ReduxUtils.buildConfig(ApiUsersConstants.USERS_SKILLS_ADD_CONFIG, getState())

      dispatch(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: addUserSkillsSuccess,
            onFailure: addUserSkillsFailure,
          }),
          action.payload,
        ),
      )
    }
    return result
  }

export const addUserSkillsSuccessFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (addUserSkillsSuccess.match(action)) {
      dispatch(fetchUserSkills())
      NavigationUtils.navigate(HomeNavigationRoutes.Home)
      notification('success', i18n.t('Your skills have been added.'))
    }
    return result
  }

export const addUserSkillsFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (addUserSkillsFailure.match(action)) {
      const errorMessage = typeof action.payload === 'string' ? action.payload : i18n.t('general.errorMessageTryAgain')
      notification('danger', i18n.t('general.errorOccurred'), errorMessage)
    }
    return result
  }
