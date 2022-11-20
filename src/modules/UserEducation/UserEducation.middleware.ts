import i18n from 'i18next'
import { mergeRight, omit, pick, pipe } from 'ramda'
import { DocumentPickerResponse } from 'react-native-document-picker'
import { Middleware } from 'redux'

import { actions as ApiActions, utils as ApiUtils } from '~/api'
import { constants as ApiUsersConstants, types as ApiUsersTypes } from '~/api/users'
import * as Strings from '~/constants/strings.constants'
import * as EducationActions from '~/modules/Education/Education.reducer'
import { utils as ErrorUtils } from '~/modules/Error'
import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'
import { types as NavigationTypes, utils as NavigationUtils } from '~/modules/Navigation'
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
  clearUserEducationFormValues,
  createUserEducation,
  createUserEducationCertificate,
  createUserEducationCertificateFailure,
  createUserEducationCertificateSuccess,
  createUserEducationFailure,
  createUserEducationSuccess,
  getUserEducationSuccess,
  normaliseUserEducationSuccess,
  setUserEducation,
  setUserEducationFormValues,
  updateUserEducation,
} from './UserEducation.reducer'
import { selectFormCertificate, selectFormValues } from './UserEducation.selector'
import { UserEducation } from './UserEducation.types'

export const getUserEducationFromCredentialsFlow =
  (
    extractDataFromPayload: GeneralTypes.StdFn<any, UserTypes.UserCredentials>,
    extractEducation: GeneralTypes.StdFn<UserTypes.UserCredentials, UserEducation[]>,
  ): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (UserActions.fetchUserCredentialsSuccess.match(action)) {
      const data = extractDataFromPayload(action)
      const education = extractEducation(data)
      dispatch(getUserEducationSuccess(education))
    }
    return result
  }

export const normaliseUserEducationFlow =
  ({ normalise }: ReduxTypes.NormaliseDependency<UserEducation>): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (getUserEducationSuccess.match(action)) {
      const normalisedEducation = normalise(action.payload)
      dispatch(normaliseUserEducationSuccess(normalisedEducation))
    }
    return result
  }

export const setUserEducationFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (normaliseUserEducationSuccess.match(action)) {
      dispatch(setUserEducation(action.payload))
    }
    return result
  }

export const setUserEducationFormValuesFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (EducationActions.createEducation.match(action)) {
      const formValues = UserUtils.extractUserCredentialFormValues(ApiUsersTypes.UserCredentialTypes.Education)(
        action.payload,
      )
      dispatch(setUserEducationFormValues(formValues))
    }
    return result
  }

export const createUserEducationFlow: Middleware =
  ({ getState, dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (createUserEducation.match(action)) {
      const state = getState()
      const userId = UserSelectors.selectId(state)

      const formValues = pipe(selectFormValues, omit(['certificate']))(state)
      const userEducationPayload = UserUtils.prepareUserCredentialItemPayload(action)(formValues)

      const config = ApiUtils.prependValueToEndpointInConfig(ApiUsersConstants.USERS_CREDENTIALS_CREATE_CONFIG)(userId)

      dispatch(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: createUserEducationSuccess,
            onFailure: createUserEducationFailure,
          }),
          userEducationPayload,
        ),
      )
    }
    return result
  }

export const createUserEducationSuccessFlow =
  ({
    normalise,
    notification,
  }: ReduxTypes.NormaliseDependency<UserEducation> & { notification: typeof showSimpleMessage }): Middleware =>
  ({ dispatch, getState }) =>
  next =>
  action => {
    const result = next(action)
    if (createUserEducationSuccess.match(action)) {
      const state = getState()
      const certificate = selectFormCertificate(state) as DocumentPickerResponse | undefined
      const data = ReduxUtils.extractDataFromResponseAction(action)
      const normalised = normalise([data])
      dispatch(updateUserEducation(normalised))
      if (certificate) {
        dispatch(createUserEducationCertificate({ id: data.id, certificate }))
      }
      dispatch(clearUserEducationFormValues())
      NavigationUtils.navigate(HomeNavigationRoutes.Home as keyof NavigationTypes.ParamsList)
      notification('success', i18n.t(Strings.YOUR_QUALIFICATION_HAS_BEEN_ADDED))
    }
    return result
  }

export const createUserEducationFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (createUserEducationFailure.match(action)) {
      const errorMessage = ErrorUtils.extractErrorResponseMessage(action)
      // TODO: this should be handled by the notification module
      notification('danger', i18n.t('general.error'), errorMessage)
    }
    return result
  }

export const createUserEducationCertificateFlow: Middleware =
  ({ dispatch, getState }) =>
  next =>
  action => {
    const result = next(action)

    if (createUserEducationCertificate.match(action)) {
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
            onSuccess: createUserEducationCertificateSuccess,
            onFailure: createUserEducationCertificateFailure,
          }),
          formData,
        ),
      )
    }
    return result
  }

export const createUserEducationCertificateSuccessFlow =
  ({ normalise }: ReduxTypes.NormaliseDependency<UserEducation>): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (createUserEducationCertificateSuccess.match(action)) {
      const credential = ReduxUtils.extractDataFromResponseAction(action)
      const normalisedCredential = normalise([credential])
      dispatch(updateUserEducation(normalisedCredential))
    }

    return result
  }

export const createUserEducationCertificateFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (createUserEducationCertificateFailure.match(action)) {
      // TODO: this should be handled by the notification module
      notification(
        'danger',
        i18n.t('general.errorOccurred'),
        i18n.t(Strings.OOPS_SOMETHING_WENT_WRONG_UPLOADING_YOUR_CHALLENGE_CERTIFICATE),
      )
    }
    return result
  }
