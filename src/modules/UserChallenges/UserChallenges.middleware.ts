import { mergeRight, of } from 'ramda'
import { Middleware } from 'redux'

import { actions as ApiActions, utils as ApiUtils } from '../../api'
import { constants as ApiUsersConstants, types as ApiUsersTypes } from '../../api/users'
import * as Types from '../../types/general.types'
import { showSimpleMessage } from '../../utils/error'
import * as ErrorUtils from '../../utils/error'
import * as ReduxUtils from '../../utils/redux.utils'
import { HomeNavigationRoutes } from '../HomeNavigation/HomeNavigation.types'
import * as Navigation from '../Navigation/Navigation.actions'
import { actions as UserActions, selectors as UserSelectors, types as UserTypes, utils as UserUtils } from '../User'
import {
  createUserChallenge,
  createUserChallengeFailure,
  createUserChallengeSuccess,
  getUserChallengesSuccess,
  normaliseUserChallengesSuccess,
  setUserChallenges,
  updateUserChallenges,
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
      const payload = UserUtils.prepareCreateUserCredentialPayload(ApiUsersTypes.UserCredentialTypes.Challenge)(
        action.payload,
      )

      dispatch(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: createUserChallengeSuccess,
            onFailure: createUserChallengeFailure,
          }),
          payload,
        ),
      )
    }
    return result
  }

export const createUserChallengeSuccessFlow =
  ({
    notification,
    navigate,
  }: {
    notification: typeof showSimpleMessage
    navigate: typeof Navigation.navigate
  }): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (createUserChallengeSuccess.match(action)) {
      const userChallenge = ReduxUtils.extractDataFromResponseAction(action)
      const normalisedUserChallenge = ReduxUtils.normalise(of(userChallenge))
      notification('success', 'New Challenge successfully created!')
      navigate(HomeNavigationRoutes.Home)
      dispatch(updateUserChallenges(normalisedUserChallenge))
    }

    return result
  }

export const createUserChallengeFailureFlow =
  ({ notification }: { notification: typeof ErrorUtils.showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (createUserChallengeFailure.match(action)) {
      // TODO: this should be handled by the notification module
      notification(
        'danger',
        'An error occurred.',
        'Oops something went wrong saving your' + ' challenge! Please try again.',
      )
    }
    return result
  }

export const getUserChallengesFromCredentialsFlow =
  (
    extractDataFromPayload: Types.StdFn<any, UserTypes.UserCredentials>,
    extractChallenges: Types.StdFn<UserTypes.UserCredentials, UserChallenge[]>,
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
  (normalise: Types.StdFn<UserChallenge[], NormalisedUserChallenges>): Middleware =>
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
