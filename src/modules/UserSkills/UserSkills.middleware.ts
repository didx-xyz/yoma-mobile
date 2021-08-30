import { extractErrorMessageFromPayload } from 'modules/Error/error.utils'
import { HomeNavigationRoutes } from 'modules/HomeNavigation/HomeNavigation.types'
import * as UserSelectors from 'modules/User/User.selector'
import { mergeRight } from 'ramda'
import { Middleware } from 'redux'
import { showSimpleMessage } from 'utils/error'

import { actions as ApiActions, utils as ApiUtils } from '../../api'
import { constants as ApiSkillsConstants } from '../../api/skills'
import * as Navigation from '../Navigation/Navigation.actions'
import { extractDataFromPayload } from './../../utils/redux.utils'
import { createUserSkill, createUserSkillFailure, createUserSkillSuccess, setUserSkills } from './UserSkills.reducer'

export const createUserSkillFlow: Middleware =
  ({ getState, dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (createUserSkill.match(action)) {
      const state = getState()
      const userId = UserSelectors.selectId(state)
      const config = ApiUtils.prependIdToEndpointInConfig(ApiSkillsConstants.SKILLS_CREATE_CONFIG)(userId)

      dispatch(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: createUserSkillSuccess,
            onFailure: createUserSkillFailure,
          }),
          action.payload,
        ),
      )
    }
    return result
  }

export const createUserSkillSuccessFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (createUserSkillSuccess.match(action)) {
      const skills = extractDataFromPayload(action)
      dispatch(setUserSkills(skills))
      //TODO: add navigation as a dependency
      Navigation.navigate(HomeNavigationRoutes.Skills)
      // TODO: this should be handled by the notification module
      notification('success', 'Details saved!')
    }
    return result
  }

export const createUserSkillFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (createUserSkillFailure.match(action)) {
      const errorMessage = extractErrorMessageFromPayload(action)
      // TODO: this should be handled by the notification module
      notification('danger', 'Error', errorMessage)
    }
    return result
  }
