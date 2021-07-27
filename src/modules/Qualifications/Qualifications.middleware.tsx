import { HomeNavigationRoutes } from 'modules/HomeNavigation/HomeNavigation.types'
import { mergeRight } from 'ramda'
import { Middleware } from 'redux'
import { showSimpleMessage } from 'utils/error'
import { extractErrorMessageFromPayload } from 'utils/error.utils'

import { actions as ApiActions } from '../../api'
import { constants as ApiQualificationConstants } from '../../api/qualifications'
import * as Navigation from '../Navigation/Navigation.actions'
import {
  createQualifications,
  createQualificationsFailure,
  createQualificationsSuccess,
  setQualifications,
} from './Qualifications.reducer'
import { extractQualificationsFromPayload } from './Qualifications.utils'

export const createQualificationsFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (createQualifications.match(action)) {
      dispatch(
        ApiActions.apiRequest(
          mergeRight(ApiQualificationConstants.QUALIFICATIONS_CREATE_CONFIG, {
            onSuccess: createQualificationsSuccess,
            onFailure: createQualificationsFailure,
          }),
          action.payload,
        ),
      )
    }
    return result
  }

export const createQualificationsSuccessFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (createQualificationsSuccess.match(action)) {
      const qualificationPayload = extractQualificationsFromPayload(action)
      dispatch(setQualifications(qualificationPayload))
      //TODO: add navigation as a dependency
      Navigation.navigate(HomeNavigationRoutes.Experience)
      notification('success', 'Qualification Saved')
    }
    return result
  }

export const createQualificationsFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (createQualificationsFailure.match(action)) {
      const errorMessage = extractErrorMessageFromPayload(action)
      // TODO: this should be handled by the notification module
      notification('danger', 'Error', errorMessage)
    }
    return result
  }
