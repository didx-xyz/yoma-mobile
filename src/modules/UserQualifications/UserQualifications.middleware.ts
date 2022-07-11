import i18n from 'i18next'
import { mergeRight, omit, pick, pipe } from 'ramda'
import { DocumentPickerResponse } from 'react-native-document-picker'
import { Middleware } from 'redux'

import { actions as ApiActions, utils as ApiUtils } from '~/api'
import { constants as ApiUsersConstants, types as ApiUsersTypes } from '~/api/users'
import * as Strings from '~/constants/strings.constants'
import { utils as ErrorUtils } from '~/modules/Error'
import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'
import { utils as NavigationUtils } from '~/modules/Navigation'
import { actions as QualificationsActions } from '~/modules/Qualifications'
import {
  actions as UserActions,
  constants as UserConstants,
  selectors as UserSelectors,
  types as UserTypes,
  utils as UserUtils,
} from '~/modules/User'
import * as ReduxTypes from '~/redux/redux.types'
import * as ReduxUtils from '~/redux/redux.utils'
import * as GeneralTypes from '~/types/general.types'
import { showSimpleMessage } from '~/utils/error'

import {
  clearUserQualificationFormValues,
  createUserQualification,
  createUserQualificationCertificate,
  createUserQualificationCertificateFailure,
  createUserQualificationCertificateSuccess,
  createUserQualificationFailure,
  createUserQualificationSuccess,
  getUserQualificationsSuccess,
  normaliseUserQualificationsSuccess,
  setUserQualificationFormValues,
  setUserQualifications,
  updateUserQualifications,
} from './UserQualifications.reducer'
import { selectFormCertificate, selectFormValues } from './UserQualifications.selector'
import { UserQualification } from './UserQualifications.types'

export const getUserQualificationsFromCredentialsFlow =
  (
    extractDataFromPayload: GeneralTypes.StdFn<any, UserTypes.UserCredentials>,
    extractQualifications: GeneralTypes.StdFn<UserTypes.UserCredentials, UserQualification[]>,
  ): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (UserActions.fetchUserCredentialsSuccess.match(action)) {
      const data = extractDataFromPayload(action)
      const qualifications = extractQualifications(data)
      dispatch(getUserQualificationsSuccess(qualifications))
    }
    return result
  }

export const normaliseUserQualificationsFlow =
  ({ normalise }: ReduxTypes.NormaliseDependency<UserQualification>): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (getUserQualificationsSuccess.match(action)) {
      const normalisedQualifications = normalise(action.payload)
      dispatch(normaliseUserQualificationsSuccess(normalisedQualifications))
    }
    return result
  }

export const setUserQualificationsFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (normaliseUserQualificationsSuccess.match(action)) {
      dispatch(setUserQualifications(action.payload))
    }
    return result
  }

export const setUserQualificationFormValuesFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (QualificationsActions.createQualification.match(action)) {
      const formValues = UserUtils.extractUserCredentialFormValues(ApiUsersTypes.UserCredentialTypes.Qualification)(
        action.payload,
      )
      dispatch(setUserQualificationFormValues(formValues))
    }
    return result
  }

export const createUserQualificationFlow: Middleware =
  ({ getState, dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (createUserQualification.match(action)) {
      const state = getState()
      const userId = UserSelectors.selectId(state)

      const formValues = pipe(selectFormValues, omit(['certificate']))(state)
      const userQualificationsPayload = UserUtils.prepareUserCredentialItemPayload(action)(formValues)

      const config = ApiUtils.prependValueToEndpointInConfig(ApiUsersConstants.USERS_CREDENTIALS_CREATE_CONFIG)(userId)

      dispatch(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: createUserQualificationSuccess,
            onFailure: createUserQualificationFailure,
          }),
          userQualificationsPayload,
        ),
      )
    }
    return result
  }

export const createUserQualificationSuccessFlow =
  ({
    normalise,
    notification,
  }: ReduxTypes.NormaliseDependency<UserQualification> & { notification: typeof showSimpleMessage }): Middleware =>
  ({ dispatch, getState }) =>
  next =>
  action => {
    const result = next(action)
    if (createUserQualificationSuccess.match(action)) {
      const state = getState()
      const certificate = selectFormCertificate(state) as DocumentPickerResponse | undefined
      const data = ReduxUtils.extractDataFromResponseAction(action)
      const normalised = normalise([data])
      dispatch(updateUserQualifications(normalised))
      if (certificate) {
        dispatch(createUserQualificationCertificate({ id: data.id, certificate }))
      }
      dispatch(clearUserQualificationFormValues())
      NavigationUtils.navigate(HomeNavigationRoutes.Home)
      notification('success', i18n.t(Strings.YOUR_QUALIFICATION_HAS_BEEN_ADDED))
    }
    return result
  }

export const createUserQualificationFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (createUserQualificationFailure.match(action)) {
      const errorMessage = ErrorUtils.extractErrorResponseMessage(action)
      // TODO: this should be handled by the notification module
      notification('danger', i18n.t('general.error'), errorMessage)
    }
    return result
  }

export const createUserQualificationCertificateFlow: Middleware =
  ({ dispatch, getState }) =>
  next =>
  action => {
    const result = next(action)

    if (createUserQualificationCertificate.match(action)) {
      const state = getState()
      const userId = UserSelectors.selectId(state)
      const config = ApiUtils.zipIdsIntoConfigEndpoint([userId, action.payload.id])(
        ApiUsersConstants.USERS_CREDENTIALS_CREATE_CERTIFICATE_CONFIG,
      )

      const formData = new FormData()
      const fileData = pick(['uri', 'type', 'name'], action.payload.certificate)
      formData.append(UserConstants.USER_CREDENTIAL_CERTIFICATE_FORM_DATA_NAME, fileData)

      dispatch(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: createUserQualificationCertificateSuccess,
            onFailure: createUserQualificationCertificateFailure,
          }),
          formData,
        ),
      )
    }
    return result
  }

export const createUserQualificationCertificateSuccessFlow =
  ({ normalise }: ReduxTypes.NormaliseDependency<UserQualification>): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (createUserQualificationCertificateSuccess.match(action)) {
      const credential = ReduxUtils.extractDataFromResponseAction(action)
      const normalisedCredential = normalise([credential])
      dispatch(updateUserQualifications(normalisedCredential))
    }

    return result
  }

export const createUserQualificationCertificateFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (createUserQualificationCertificateFailure.match(action)) {
      // TODO: this should be handled by the notification module
      notification(
        'danger',
        i18n.t('general.errorOccurred'),
        i18n.t(Strings.OOPS_SOMETHING_WENT_WRONG_UPLOADING_YOUR_CHALLENGE_CERTIFICATE),
      )
    }
    return result
  }
