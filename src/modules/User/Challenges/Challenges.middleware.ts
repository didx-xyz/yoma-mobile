import { Middleware } from 'redux'

import { StdFn } from '../../../types/general.types'
import * as UserActions from '../User.reducer'
import { UserCredentials } from '../User.types'
import { getChallengesSuccess, normaliseChallengesSuccess, setChallenges } from './Challenges.reducer'
import { NormalisedChallenges, UserChallenge } from './Challenges.types'

export const getChallengesFromCredentialsFlow =
  (extractChallenges: StdFn<UserCredentials, UserChallenge[]>): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (UserActions.fetchUserCredentialsSuccess.match(action)) {
      const challenges = extractChallenges(action.payload)
      dispatch(getChallengesSuccess(challenges))
    }
    return result
  }

export const normaliseChallengesFlow =
  (normalise: StdFn<UserChallenge[], NormalisedChallenges>): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (getChallengesSuccess.match(action)) {
      const normalisedChallenges = normalise(action.payload)
      dispatch(normaliseChallengesSuccess(normalisedChallenges))
    }
    return result
  }

export const setChallengesFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (normaliseChallengesSuccess.match(action)) {
      dispatch(setChallenges(action.payload))
    }
    return result
  }
