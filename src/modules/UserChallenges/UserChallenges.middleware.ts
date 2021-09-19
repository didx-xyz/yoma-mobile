import { mergeRight } from 'ramda'
import { Middleware } from 'redux'

import { actions as ApiActions, utils as ApiUtils } from '../../api'
import { constants as ApiUsersConstants } from '../../api/users'
import { StdFn } from '../../types/general.types'
import { showSimpleMessage } from '../../utils/error'
import { extractDataFromPayload } from '../../utils/redux.utils'
import * as UserActions from '../User/User.reducer'
import * as UserSelectors from '../User/User.selector'
import { UserCredentials } from '../User/User.types'
import {
  createUserChallenge,
  createUserChallengeFailure,
  createUserChallengeSuccess,
  getUserChallengesSuccess,
  normaliseUserChallengesSuccess,
  setUserChallenges,
} from './UserChallenges.reducer'
import { NormalisedUserChallenges, UserChallenge } from './UserChallenges.types'

export const createUserChallengeFlow: Middleware =
  ({ dispatch, getState }) =>
  next =>
  action => {
    const result = next(action)

    if (createUserChallenge.match(action)) {
      const state = getState()
      const userId = UserSelectors.selectId(state)
      const config = ApiUtils.prependIdToEndpointInConfig(ApiUsersConstants.USERS_CREDENTIALS_CREATE_CONFIG)(userId)

      dispatch(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: createUserChallengeSuccess,
            onFailure: createUserChallengeFailure,
          }),
          action.payload,
        ),
      )
    }
    return result
  }

export const createUserChallengeSuccessFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (createUserChallengeSuccess.match(action)) {
      // const job = extractDataFromPayload(action)
      dispatch(UserChallengesActions.createUserChallenge(job))
    }

    return result
  }

export const createUserChallengeFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (createUserChallengeFailure.match(action)) {
      // TODO: this should be handled by the notification module
      notification('danger', 'An error occurred.', 'Oops something went wrong! Please try again.')
    }
    return result
  }

export const getUserChallengesFromCredentialsFlow =
  (
    extractDataFromPayload: StdFn<any, UserCredentials>,
    extractChallenges: StdFn<UserCredentials, UserChallenge[]>,
  ): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (UserActions.fetchUserCredentialsSuccess.match(action)) {
      const data = extractDataFromPayload(action)
      const challenges = extractChallenges(data)
      dispatch(getUserChallengesSuccess(challenges))
    }
    return result
  }

export const normaliseUserChallengesFlow =
  (normalise: StdFn<UserChallenge[], NormalisedUserChallenges>): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (getUserChallengesSuccess.match(action)) {
      const normalisedChallenges = normalise(action.payload)
      dispatch(normaliseUserChallengesSuccess(normalisedChallenges))
    }
    return result
  }

export const setUserChallengesFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (normaliseUserChallengesSuccess.match(action)) {
      dispatch(setUserChallenges(action.payload))
    }
    return result
  }
