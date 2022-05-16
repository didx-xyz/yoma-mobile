import { mergeRight } from 'ramda'
import { Middleware } from 'redux'

import { actions as ApiActions, utils as ApiUtils } from '~/api'
import { constants as ApiUsersConstants } from '~/api/users'
import { selectId } from '~/modules/User/User.selector'
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
      const state = getState()
      const userId = selectId(state)
      const config = ApiUtils.prependValueToEndpointInConfig(ApiUsersConstants.USERS_SKILLS_GET_BY_ID_CONFIG)(userId)
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
      const data = ReduxUtils.extractDataFromResponseAction(action)
      const skills = ReduxUtils.normalise(data, UserSkillKeys.SkillName)
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
      notification('danger', 'An error occurred.', 'Oops something went wrong! Please try again.')
    }
    return result
  }

export const addUserSkillsFlow: Middleware =
  ({ dispatch, getState }) =>
  next =>
  action => {
    const result = next(action)
    if (addUserSkills.match(action)) {
      const state = getState()
      const userId = selectId(state)
      const config = ApiUtils.prependValueToEndpointInConfig(ApiUsersConstants.USERS_SKILLS_ADD_CONFIG)(userId)
      dispatch(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: addUserSkillsSuccess,
            onFailure: addUserSkillsFailure,
          }),
        ),
      )
    }
    return result
  }

export const addUserSkillsSuccessFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (addUserSkillsSuccess.match(action)) {
      console.log({ action })
      const data = ReduxUtils.extractDataFromResponseAction(action)
      const skills = ReduxUtils.normalise(data, UserSkillKeys.SkillName)
      dispatch(setUserSkills(skills))
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
      console.log({ action })
      notification('danger', 'An error occurred.', 'Oops something went wrong! Please try again.')
    }
    return result
  }
