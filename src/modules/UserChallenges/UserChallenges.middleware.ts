import { mergeRight, of, pick } from 'ramda'
import { DocumentPickerResponse } from 'react-native-document-picker'
import { Middleware } from 'redux'

import { actions as ApiActions, utils as ApiUtils } from '~/api'
import { constants as ApiUsersConstants, types as ApiUsersTypes } from '~/api/users'
import * as Strings from '~/constants/strings.constants'
import { extractErrorResponseMessage } from '~/modules/Error/error.utils'
import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'
import * as Navigation from '~/modules/Navigation/Navigation.utils'
import {
  actions as UserActions,
  constants as UserConstants,
  selectors as UserSelectors,
  types as UserTypes,
  utils as UserUtils,
} from '~/modules/User'
import * as ReduxTypes from '~/redux/redux.types'
import * as ReduxUtils from '~/redux/redux.utils'
import * as Types from '~/types/general.types'
import * as ErrorUtils from '~/utils/error'

import {
  createUserChallenge,
  createUserChallengeCertificate,
  createUserChallengeCertificateFailure,
  createUserChallengeCertificateSuccess,
  createUserChallengeFailure,
  createUserChallengeSuccess,
  getUserChallengesSuccess,
  normaliseUserChallengesSuccess,
  setFormValues,
  setUserChallenges,
  updateUserChallenges,
} from './UserChallenges.reducer'
import { selectFormCertificate } from './UserChallenges.selector'
import { UserChallenge } from './UserChallenges.types'

export const setUserChallengeFormValuesFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (createUserChallenge.match(action)) {
      const payload = pick(['certificate'])(action.payload)
      dispatch(setFormValues(payload))
    }
    return result
  }

export const createUserChallengeFlow: Middleware =
  ({ dispatch, getState }) =>
  next =>
  action => {
    const result = next(action)

    if (createUserChallenge.match(action)) {
      const state = getState()
      const userId = UserSelectors.selectId(state)
      const config = ApiUtils.prependValueToEndpointInConfig(ApiUsersConstants.USERS_CREDENTIALS_CREATE_CONFIG)(userId)
      const payload = UserUtils.prepareCreateUserCredentialPayload(ApiUsersTypes.UserCredentialTypes.Challenge)(
        action.payload,
      )

      dispatch(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: createUserChallengeSuccess,
            onFailure: createUserChallengeFailure,
          }),
          payload,
        ),
      )
    }
    return result
  }

export const createUserChallengeSuccessFlow =
  ({
    notification,
    navigate,
  }: {
    notification: typeof ErrorUtils.showSimpleMessage
    navigate: typeof Navigation.navigate
  }): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (createUserChallengeSuccess.match(action)) {
      const userChallenge = ReduxUtils.extractDataFromResponseAction(action)
      const normalisedUserChallenge = ReduxUtils.normalise(of(userChallenge))
      notification('success', Strings.NEW_CHALLENGE_SUCCESSFULLY_CREATED)
      navigate(HomeNavigationRoutes.Home)
      dispatch(updateUserChallenges(normalisedUserChallenge))
      dispatch(createUserChallengeCertificate(userChallenge.id))
    }

    return result
  }

export const createUserChallengeFailureFlow =
  ({ notification }: { notification: typeof ErrorUtils.showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (createUserChallengeFailure.match(action)) {
      const message = extractErrorResponseMessage(action)
      // TODO: this should be handled by the notification module
      notification('danger', Strings.OOPS_SOMETHING_WENT_WRONG, message)
    }
    return result
  }

export const createUserChallengeCertificateFlow: Middleware =
  ({ dispatch, getState }) =>
  next =>
  action => {
    const result = next(action)

    if (createUserChallengeCertificate.match(action)) {
      const state = getState()
      const certificate = selectFormCertificate(state) as DocumentPickerResponse | undefined
      if (certificate) {
        const userId = UserSelectors.selectId(state)
        const config = ApiUtils.zipIdsIntoConfigEndpoint([userId, action.payload])(
          ApiUsersConstants.USERS_CREDENTIALS_CREATE_CERTIFICATE_CONFIG,
        )

        const formData = new FormData()
        const fileData = pick(['uri', 'type', 'name'], certificate)
        formData.append(UserConstants.USER_CREDENTIAL_CERTIFICATE_FORM_DATA_NAME, fileData)

        dispatch(
          ApiActions.apiRequest(
            mergeRight(config, {
              onSuccess: createUserChallengeCertificateSuccess,
              onFailure: createUserChallengeCertificateFailure,
            }),
            formData,
          ),
        )
      }
    }
    return result
  }

export const createUserChallengeCertificateSuccessFlow =
  ({ normalise }: ReduxTypes.NormaliseDependency<UserChallenge>): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (createUserChallengeCertificateSuccess.match(action)) {
      const credential = ReduxUtils.extractDataFromResponseAction(action)
      const normalisedCredential = normalise([credential])
      dispatch(updateUserChallenges(normalisedCredential))
    }

    return result
  }

export const createUserChallengeCertificateFailureFlow =
  ({ notification }: { notification: typeof ErrorUtils.showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (createUserChallengeCertificateFailure.match(action)) {
      // TODO: this should be handled by the notification module
      notification(
        'danger',
        Strings.AN_ERROR_OCCURRED,
        Strings.OOPS_SOMETHING_WENT_WRONG_UPLOADING_YOUR_CHALLENGE_CERTIFICATE,
      )
    }
    return result
  }

export const getUserChallengesFromCredentialsFlow =
  (
    extractDataFromPayload: Types.StdFn<any, UserTypes.UserCredentials>,
    extractChallenges: Types.StdFn<UserTypes.UserCredentials, UserChallenge[]>,
  ): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (UserActions.fetchUserCredentialsSuccess.match(action)) {
      const data = extractDataFromPayload(action)
      const challenges = extractChallenges(data)
      dispatch(getUserChallengesSuccess(challenges))
    }
    return result
  }

export const normaliseUserChallengesFlow =
  ({ normalise }: ReduxTypes.NormaliseDependency<UserChallenge>): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (getUserChallengesSuccess.match(action)) {
      const normalisedChallenges = normalise(action.payload)
      dispatch(normaliseUserChallengesSuccess(normalisedChallenges))
    }
    return result
  }

export const setUserChallengesFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (normaliseUserChallengesSuccess.match(action)) {
      dispatch(setUserChallenges(action.payload))
    }
    return result
  }
