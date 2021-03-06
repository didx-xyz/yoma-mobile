import { mergeRight } from 'ramda'
import { Middleware } from 'redux'

import { actions as ApiActions } from '~/api'
import { constants as ApiChallengesConstants } from '~/api/challenges'
import * as ReduxTypes from '~/redux/redux.types'
import { extractDataFromResponseAction } from '~/redux/redux.utils'

import {
  fetchChallenges,
  fetchChallengesFailure,
  fetchChallengesSuccess,
  normaliseChallengesSuccess,
  setChallenges,
} from './Challenges.reducer'
import { Challenge } from './Challenges.types'

export const fetchChallengesFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (fetchChallenges.match(action)) {
      dispatch(
        ApiActions.apiRequest(
          mergeRight(ApiChallengesConstants.CHALLENGES_GET_ALL_CONFIG, {
            onSuccess: fetchChallengesSuccess,
            onFailure: fetchChallengesFailure,
          }),
          action.payload,
        ),
      )
    }
    return result
  }

export const normaliseChallengesFlow =
  ({ normalise }: ReduxTypes.NormaliseDependency<Challenge>): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (fetchChallengesSuccess.match(action)) {
      const data = extractDataFromResponseAction(action)
      const challenges = normalise(data)
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
