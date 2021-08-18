import { Middleware } from 'redux'

import { Normalise, StdFn } from '../../types/general.types'
import * as UserActions from '../User/User.reducer'
import { UserCredentials } from '../User/User.types'
import { getUserJobsSuccess, normaliseUserJobsSuccess, setUserJobs } from './UserJobs.reducer'
import { NormalisedUserJobs, UserJobCredential } from './UserJobs.types'

export const getUserJobsFromCredentialsFlow =
  (
    extractDataFromPayload: StdFn<any, UserCredentials>,
    extractJobs: StdFn<UserCredentials, UserJobCredential[]>,
  ): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (UserActions.fetchUserCredentialsSuccess.match(action)) {
      const data = extractDataFromPayload(action)
      const jobs = extractJobs(data)
      dispatch(getUserJobsSuccess(jobs))
    }
    return result
  }

export const normaliseUserJobsFlow =
  (normalise: Normalise<UserJobCredential, NormalisedUserJobs>): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (getUserJobsSuccess.match(action)) {
      const normalisedJobs = normalise(action.payload)
      dispatch(normaliseUserJobsSuccess(normalisedJobs))
    }
    return result
  }

export const setUserJobsFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (normaliseUserJobsSuccess.match(action)) {
      dispatch(setUserJobs(action.payload))
    }
    return result
  }
