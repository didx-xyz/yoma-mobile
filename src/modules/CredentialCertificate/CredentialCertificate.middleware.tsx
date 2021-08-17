import { selectId } from 'modules/User/User.selector'
import { mergeRight } from 'ramda'
import { Middleware } from 'redux'
import { showSimpleMessage } from 'utils/error'

import { actions as ApiActions, utils as ApiUtils } from '../../api'
import { constants as ApiUserConstants } from '../../api/users'
import {
  createCredentialCertificateFailure,
  createCredentialCertificateSuccess,
  setCredentialItemId,
} from './CredentialCertificate.reducer'
import { selectCredentialCertificate } from './CredentialCertificate.selector'

export const createCredentialCertificateFlow: Middleware =
  ({ getState, dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (setCredentialItemId.match(action)) {
      const state = getState()
      const userId = selectId(state)
      const credentialCertificate = selectCredentialCertificate(state)
      const config = ApiUtils.prependIdToEndpointInConfig(ApiUserConstants.USERS_CREDENTIALS_CREATE_CONFIG)(userId)
      dispatch(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: createCredentialCertificateSuccess,
            onFailure: createCredentialCertificateFailure,
          }),
          credentialCertificate,
        ),
      )
    }
    return result
  }

export const createCredentialCertificateSuccessFlow: Middleware = _store => next => action => {
  const result = next(action)

  //returns a single user credential
  if (createCredentialCertificateSuccess.match(action)) {
  }

  return result
}

export const createCredentialCertificateFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (createCredentialCertificateFailure.match(action)) {
      // TODO: this should be handled by the notification module
      notification('danger', 'An error occurred.', 'Oops something went wrong! Please try again.')
    }
    return result
  }
