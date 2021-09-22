import { mergeDeepRight, mergeRight, of, pick } from 'ramda'
import { DocumentPickerResponse } from 'react-native-document-picker'
import { Middleware } from 'redux'

import { actions as ApiActions, utils as ApiUtils } from '../../api'
import { constants as ApiUsersConstants, types as ApiUsersTypes } from '../../api/users'
import { Normalise, NormaliseDep, NormalisedDataEntities } from '../../redux/redux.types'
import { extractDataFromResponseAction } from '../../redux/redux.utils'
import * as ReduxUtils from '../../redux/redux.utils'
import * as Types from '../../types/general.types'
import { showSimpleMessage } from '../../utils/error'
import * as ErrorUtils from '../../utils/error'
import { HomeNavigationRoutes } from '../HomeNavigation/HomeNavigation.types'
import * as Navigation from '../Navigation/Navigation.actions'
import { actions as UserActions, selectors as UserSelectors, types as UserTypes, utils as UserUtils } from '../User'
import { USER_CREDENTIAL_CERTIFICATE_FORM_DATA_NAME } from '../User/User.constants'
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
import { selectFormCertificate, selectUserChallengeEntities, selectUserChallenges } from './UserChallenges.selector'
import {
  NormalisedUserChallengeEntities,
  NormalisedUserChallenges,
  UserChallenge,
  UserChallengeItem,
} from './UserChallenges.types'

export const setUserChallengeFormValuesFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (createUserChallenge.match(action)) {
      const payload = pick(['certificate'])(action.payload)
      console.log({ payload })
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
    notification: typeof showSimpleMessage
    navigate: typeof Navigation.navigate
  }): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (createUserChallengeSuccess.match(action)) {
      const userChallenge = ReduxUtils.extractDataFromResponseAction(action)
      const normalisedUserChallenge = ReduxUtils.normalise(of(userChallenge))
      notification('success', 'New Challenge successfully created!')
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
      // TODO: this should be handled by the notification module
      notification(
        'danger',
        'An error occurred.',
        'Oops something went wrong saving your' + ' challenge! Please try again.',
      )
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
        formData.append(USER_CREDENTIAL_CERTIFICATE_FORM_DATA_NAME, fileData)

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
  ({ normalise }: NormaliseDep<UserChallenge>): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (createUserChallengeCertificateSuccess.match(action)) {
      const credential = extractDataFromResponseAction(action)
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
        'An error occurred.',
        'Oops something went wrong uploading your' + ' challenge certificate. Please try again.',
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
  ({ normalise }: NormaliseDep<UserChallenge>): Middleware =>
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
