import { selectId } from 'modules/User/User.selector'
import { mergeRight } from 'ramda'
import { Middleware } from 'redux'
import { showSimpleMessage } from 'utils/error'

import { actions as ApiActions, utils as ApiUtils } from '../../api'
import { constants as ApiUserConstants } from '../../api/users'
import {
  createCredentialItemFailure,
  createCredentialItemSuccess,
  setCredentialItemId,
} from './CredentialItems.reducer'
import { selectCredentialItems } from './CredentialItems.selector'

export const createCredentialItemFlow: Middleware =
  ({ getState, dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (setCredentialItemId.match(action)) {
      const state = getState()
      const userId = selectId(state)
      const credentialItem = selectCredentialItems(state)
      const config = ApiUtils.prependIdToEndpointInConfig(ApiUserConstants.USERS_CREDENTIALS_CREATE_CONFIG)(userId)
      dispatch(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: createCredentialItemSuccess,
            onFailure: createCredentialItemFailure,
          }),
          credentialItem,
        ),
      )
    }
    return result
  }

export const createCredentialItemSuccessFlow: Middleware = _store => next => action => {
  const result = next(action)

  //returns a single user credential
  if (createCredentialItemSuccess.match(action)) {
  }

  return result
}

export const createCredentialItemFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (createCredentialItemFailure.match(action)) {
      // TODO: this should be handled by the notification module
      notification('danger', 'An error occurred.', 'Oops something went wrong! Please try again.')
    }
    return result
  }
