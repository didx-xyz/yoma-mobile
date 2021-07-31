import { Middleware } from 'redux'
import { normalise } from 'utils/redux.utils'

import { UserCredentialTypes } from '../../../api/users/users.types'
import * as UserActions from '../User.reducer'
import * as UserUtils from '../User.utils'
import { getChallengesSuccess, normalisedChallenges, setChallenges } from './Challenges.reducer'

export const getChallengesFromFetchCredentialsFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (UserActions.fetchUserCredentialsSuccess.match(action)) {
      const challenges = UserUtils.extractCredentialsByType(UserCredentialTypes.Challenge)(action.payload)
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
      dispatch(normalisedChallenges(challenges))
    }
    return result
  }

export const setChallengesFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (normalisedChallenges.match(action)) {
      dispatch(setChallenges(action.payload))
    }
    return result
  }
