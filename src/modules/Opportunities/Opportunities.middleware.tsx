import { mergeRight } from 'ramda'
import { Middleware } from 'redux'

import { extractDataFromResponseAction } from '~/redux/redux.utils'
import { showSimpleMessage } from '~/utils/error'

import { actions as ApiActions } from '../../api'
import { constants as ApiOpportunitiesConstants } from '../../api/opportunities'
import * as ReduxTypes from '../../redux/redux.types'
import {
  fetchOpportunities,
  fetchOpportunitiesFailure,
  fetchOpportunitiesSuccess,
  getOpportunitiesSuccess,
  normaliseOpportunitiesSuccess,
  setOpportunities,
} from './Opportunities.reducer'
import { opportunities } from './Opportunities.types'

export const fetchOpportunitiesFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (fetchOpportunities.match(action)) {
      dispatch(
        ApiActions.apiRequest(
          mergeRight(ApiOpportunitiesConstants.OPPORTUNITIES_GET_ALL_CONFIG, {
            onSuccess: fetchOpportunitiesSuccess,
            onFailure: fetchOpportunitiesFailure,
          }),
        ),
      )
    }
    return result
  }

export const fetchOpportunitiesSuccessFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (fetchOpportunities.match(action)) {
      const data = extractDataFromResponseAction(action)
      dispatch(getOpportunitiesSuccess(data))
    }
    return result
  }

export const normaliseOpportunitiesFlow =
  ({ normalise }: ReduxTypes.NormaliseDependency<opportunities>): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (fetchOpportunitiesSuccess.match(action)) {
      const data = extractDataFromResponseAction(action)
      const normalisedOpportunities = normalise(data)
      dispatch(normaliseOpportunitiesSuccess(normalisedOpportunities))
    }
    return result
  }

export const setOpportunitiesFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (normaliseOpportunitiesSuccess.match(action)) {
      dispatch(setOpportunities(action.payload))
    }
    return result
  }

export const fetchOpportunitiesFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (fetchOpportunitiesFailure.match(action)) {
      // TODO: this should be handled by the notification module
      notification('danger', 'An error occurred.', 'Oops something went wrong! Please try again.')
    }
    return result
  }
