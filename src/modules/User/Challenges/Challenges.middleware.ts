import { Middleware } from 'redux'

import { StdFn } from '../../../types/general.types'
import * as UserActions from '../User.reducer'
import { getChallengesSuccess, normaliseChallengesSuccess, setChallenges } from './Challenges.reducer'

export const getChallengesFromCredentialsFlow =
  (extractChallenges: StdFn<any, any>): Middleware =>
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
  (normalise: StdFn<any, any>): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (getChallengesSuccess.match(action)) {
      const challenges = normalise(action.payload)
      dispatch(normaliseChallengesSuccess(challenges))
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
