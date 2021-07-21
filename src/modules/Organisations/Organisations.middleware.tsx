import {
  fetchOrganisations,
  fetchOrganisationsFailure,
  fetchOrganisationsSuccess,
  setOrganisations,
} from 'modules/Organisations/Organisations.reducer'
import { mergeRight } from 'ramda'
import { Middleware } from 'redux'
import { showSimpleMessage } from 'utils/error'

import { actions as ApiActions } from '../../api'
import { constants as ApiOrganisationConstants } from '../../api/organisations'
import { selectOrganisationsFromPayload } from './Organisations.utils'

export const fetchOrganisationsFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (fetchOrganisations.match(action)) {
      dispatch(
        ApiActions.apiRequest(
          mergeRight(ApiOrganisationConstants.ORGANISATIONS_GET_KEY_NAMES_CONFIG, {
            onSuccess: fetchOrganisationsSuccess,
            onFailure: fetchOrganisationsFailure,
          }),
        ),
      )
    }
    return result
  }

export const fetchOrganisationsSuccessFlow: Middleware = _store => next => action => {
  const result = next(action)

  if (fetchOrganisationsSuccess.match(action)) {
    const organisationPayload = selectOrganisationsFromPayload(action)
    setOrganisations(organisationPayload)
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
