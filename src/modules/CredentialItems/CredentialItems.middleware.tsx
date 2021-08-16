import { mergeRight } from 'ramda'
import { Middleware } from 'redux'
import { showSimpleMessage } from 'utils/error'

import { actions as ApiActions } from '../../api'
import { constants as ApiCredentialItemsConstants } from '../../api/users'
import {
  createCredentialItem,
  createCredentialItemFailure,
  createCredentialItemSuccess,
} from './CredentialItems.reducer'

export const createCredentialItemFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (createCredentialItem.match(action)) {
      dispatch(
        ApiActions.apiRequest(
          mergeRight(ApiCredentialItemsConstants.USERS_CREDENTIALS_CREATE_CONFIG, {
            onSuccess: createCredentialItemSuccess,
            onFailure: createCredentialItemFailure,
          }),
          action.payload,
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
