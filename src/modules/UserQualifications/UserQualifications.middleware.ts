import { Middleware } from 'redux'

import { NormaliseDependency } from '../../redux/redux.types'
import { StdFn } from '../../types/general.types'
import * as UserActions from '../User/User.reducer'
import { UserCredentials } from '../User/User.types'
import {
  getUserQualificationsSuccess,
  normaliseUserQualificationsSuccess,
  setUserQualifications,
} from './UserQualifications.reducer'
import { UserQualification } from './UserQualifications.types'

export const getUserQualificationsFromCredentialsFlow =
  (
    extractDataFromPayload: StdFn<any, UserCredentials>,
    extractQualifications: StdFn<UserCredentials, UserQualification[]>,
  ): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (UserActions.fetchUserCredentialsSuccess.match(action)) {
      const data = extractDataFromPayload(action)
      const qualifications = extractQualifications(data)
      dispatch(getUserQualificationsSuccess(qualifications))
    }
    return result
  }

export const normaliseUserQualificationsFlow =
  ({ normalise }: NormaliseDependency<UserQualification>): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (getUserQualificationsSuccess.match(action)) {
      const normalisedChallenges = normalise(action.payload)
      dispatch(normaliseUserQualificationsSuccess(normalisedChallenges))
    }
    return result
  }

export const setUserQualificationsFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (normaliseUserQualificationsSuccess.match(action)) {
      dispatch(setUserQualifications(action.payload))
    }
    return result
  }
