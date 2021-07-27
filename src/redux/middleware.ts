import * as SecureStore from 'expo-secure-store'
import FormData from 'form-data'
import { concat } from 'ramda'
import ImagePicker from 'react-native-image-crop-picker'
import { Middleware } from 'redux'

import { apiConfig, middleware as ApiMiddleware, utils as ApiUtils } from '../api'
import { middleware as AppMiddleware } from '../modules/App'
import { middleware as AuthMiddleware } from '../modules/Auth'
import { middleware as ErrorMiddleware } from '../modules/Error'
import * as Navigation from '../modules/Navigation/Navigation.actions'
import { middleware as OrganisationsMiddleware } from '../modules/Organisations'
import { middleware as QualificationsMiddleware } from '../modules/Qualifications'
import ssoAuth from '../modules/SSOAuth'
import { middleware as SkillsMiddleware } from '../modules/Skills'
import { middleware as UserMiddleware, utils as UserUtils } from '../modules/User'
import { middleware as UserCredentialsMiddleware } from '../modules/UserCredentials'
import { showSimpleMessage } from '../utils/error'

const createDebugger = require('redux-flipper').default

const devMiddleware = [createDebugger()]

const commonMiddleware: Middleware[] = [
  ApiMiddleware.apiFlow({ api: apiConfig.createApiClient, prepArgs: ApiUtils.prepareApiRequest }),
  AppMiddleware.appResetFlow,
  AppMiddleware.hydrateAppFlow,
]

const featureModuleMiddleware = [
  AuthMiddleware.loginFailureFlow({ notification: showSimpleMessage }),
  AuthMiddleware.authorizeFlow,
  AuthMiddleware.authorizeSuccessFlow({ notification: showSimpleMessage }),
  AuthMiddleware.authorizeWithRefreshTokenFailureFlow,
  AuthMiddleware.authorizeWithRefreshTokenFlow,
  AuthMiddleware.registrationFailureFlow({ notification: showSimpleMessage }),
  AuthMiddleware.registrationFlow,
  AuthMiddleware.registrationSuccessFlow({ notification: showSimpleMessage }),
  AuthMiddleware.authSocialLoginFailureFlow({ notification: showSimpleMessage }),
  AuthMiddleware.authSocialLoginFlow({ ssoAuth, notification: showSimpleMessage }),
  AuthMiddleware.authSocialLoginSuccessFlow,
  AuthMiddleware.authSocialRegistrationFailureFlow({ notification: showSimpleMessage }),
  AuthMiddleware.authSocialRegistrationFlow({ ssoAuth }),
  AuthMiddleware.authSocialRegistrationSuccessFlow,
  AuthMiddleware.deleteSecureRefreshTokenFlow(SecureStore.deleteItemAsync),
  AuthMiddleware.getSecureRefreshTokenFlow(SecureStore.getItemAsync),
  AuthMiddleware.loginFailureFlow({ notification: showSimpleMessage }),
  AuthMiddleware.loginFlow,
  AuthMiddleware.logoutFlow,
  AuthMiddleware.registrationFailureFlow({ notification: showSimpleMessage }),
  AuthMiddleware.registrationFlow,
  AuthMiddleware.registrationSuccessFlow({ notification: showSimpleMessage }),
  AuthMiddleware.setSecureRefreshTokenFlow(SecureStore.setItemAsync),
  AuthMiddleware.unauthorizedFlow,
  ErrorMiddleware.categorizeErrorsFlow,
  OrganisationsMiddleware.fetchOrganisationsFlow,
  OrganisationsMiddleware.fetchOrganisationsSuccessFlow,
  OrganisationsMiddleware.fetchOrganisationsFailureFlow({ notification: showSimpleMessage }),
  SkillsMiddleware.fetchSkillsFlow,
  SkillsMiddleware.fetchSkillsSuccessFlow,
  SkillsMiddleware.fetchSkillsFailureFlow({ notification: showSimpleMessage }),
  UserMiddleware.setUserOnAuthFlow,
  UserMiddleware.updateUserFlow,
  UserMiddleware.updateUserSuccessFlow({ notification: showSimpleMessage }),
  UserMiddleware.updateUserFailureFlow({ notification: showSimpleMessage }),
  UserMiddleware.setUserOnAuthFlow,
  UserMiddleware.updateUserFailureFlow({ notification: showSimpleMessage }),
  UserMiddleware.updateUserFlow,
  UserMiddleware.updateUserSuccessFlow({ notification: showSimpleMessage }),
  UserMiddleware.uploadUserPhotoFlow({
    imagePicker: ImagePicker,
    createPayload: UserUtils.createPhotoFormPayload(FormData),
  }),
  UserMiddleware.uploadUserPhotoSuccessFlow,
  UserMiddleware.uploadUserPhotoFailureFlow({ notification: showSimpleMessage }),
  UserMiddleware.updateUserPhotoSuccessFlow({ notification: showSimpleMessage }),
  UserMiddleware.updateUserPhotoFailureFlow({ notification: showSimpleMessage }),
  UserCredentialsMiddleware.fetchUserCredentialsFlow,
  UserCredentialsMiddleware.fetchUserCredentialsSuccessFlow,
  UserCredentialsMiddleware.fetchUserCredentialsFailureFlow({ notification: showSimpleMessage }),
  QualificationsMiddleware.createQualificationsFlow,
  QualificationsMiddleware.createQualificationsSuccessFlow({ notification: showSimpleMessage }),
  QualificationsMiddleware.createQualificationsFailureFlow({ notification: showSimpleMessage }),
]

const middleware = concat(commonMiddleware, featureModuleMiddleware)

const combinedMiddleware = __DEV__ ? concat(middleware, devMiddleware) : middleware

export default combinedMiddleware
