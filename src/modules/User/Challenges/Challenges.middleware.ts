import { Middleware } from 'redux'
import { normalise } from 'utils/redux.utils'

import * as UserActions from '../User.reducer'
import { getChallengesSuccess, normaliseChallengesSuccess, setChallenges } from './Challenges.reducer'

export const getChallengesFromFetchCredentialsFlow =
  (extractChallenges: any): Middleware =>
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

export const normaliseChallengesFlow: Middleware =
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
