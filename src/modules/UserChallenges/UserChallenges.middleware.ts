import { Middleware } from 'redux'

import { StdFn } from '../../types/general.types'
import * as UserActions from '../User/User.reducer'
import { UserCredentials } from '../User/User.types'
import { getUserChallengesSuccess, normaliseUserChallengesSuccess, setUserChallenges } from './UserChallenges.reducer'
import { NormalisedChallenges, UserChallenge } from './UserChallenges.types'

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
  (normalise: StdFn<UserChallenge[], NormalisedChallenges>): Middleware =>
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
