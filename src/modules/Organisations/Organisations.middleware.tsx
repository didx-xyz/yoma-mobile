import { mergeRight } from 'ramda'
import { Middleware } from 'redux'
import { extractDataFromResponseAction } from 'redux/redux.utils'
import { showSimpleMessage } from 'utils/error'

import { actions as ApiActions } from '../../api'
import { constants as ApiOrganisationsConstants } from '../../api/organisations'
import * as ReduxTypes from '../../redux/redux.types'
import {
  fetchOrganisations,
  fetchOrganisationsFailure,
  fetchOrganisationsSuccess,
  getOrganisationsSuccess,
  normaliseOrganisationsSuccess,
  setOrganisations,
} from './Organisations.reducer'
import { Organisation } from './Organisations.types'

export const fetchOrganisationsFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (fetchOrganisations.match(action)) {
      dispatch(
        ApiActions.apiRequest(
          mergeRight(ApiOrganisationsConstants.ORGANISATIONS_GET_KEY_NAMES_CONFIG, {
            onSuccess: fetchOrganisationsSuccess,
            onFailure: fetchOrganisationsFailure,
          }),
        ),
      )
    }
    return result
  }

export const fetchOrganisationsSuccessFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (fetchOrganisationsSuccess.match(action)) {
      const data = extractDataFromResponseAction(action)
      dispatch(getOrganisationsSuccess(data))
    }
    return result
  }

export const normaliseOrganisationsFlow =
  ({ normalise }: ReduxTypes.NormaliseDependency<Organisation>): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (getOrganisationsSuccess.match(action)) {
      const normalisedOrganisations = normalise(action.payload, 'key')
      dispatch(normaliseOrganisationsSuccess(normalisedOrganisations))
    }
    return result
  }

export const setOrganisationsFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (normaliseOrganisationsSuccess.match(action)) {
      dispatch(setOrganisations(action.payload))
    }
    return result
  }

export const fetchOrganisationsFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (fetchOrganisationsFailure.match(action)) {
      // TODO: this should be handled by the notification module
      notification('danger', 'An error occurred.', 'Oops something went wrong! Please try again.')
    }
    return result
  }
