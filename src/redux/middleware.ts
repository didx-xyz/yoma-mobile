import * as SecureStore from 'expo-secure-store'
import FormData from 'form-data'
import { concat } from 'ramda'
import ImagePicker from 'react-native-image-crop-picker'
import { Middleware } from 'redux'
import * as ReduxUtils from 'utils/redux.utils'

import { apiConfig, middleware as ApiMiddleware, utils as ApiUtils } from '../api'
import { types as ApiUsersTypes } from '../api/users'
import { middleware as AppMiddleware } from '../modules/App'
import { middleware as AuthMiddleware } from '../modules/Auth'
import { middleware as ErrorMiddleware } from '../modules/Error'
import { middleware as JobsMiddleware } from '../modules/Jobs'
import { middleware as OrganisationsMiddleware } from '../modules/Organisations'
import ssoAuth from '../modules/SSOAuth'
import { middleware as SkillsMiddleware } from '../modules/Skills'
import { middleware as UserMiddleware, utils as UserUtils } from '../modules/User'
import { middleware as UserChallengesMiddleware } from '../modules/UserChallenges'
import { middleware as UserJobsMiddleware } from '../modules/UserJobs'
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
  OrganisationsMiddleware.normaliseOrganisationsFlow(ReduxUtils.normalise),
  OrganisationsMiddleware.setOrganisationsFlow,
  UserChallengesMiddleware.getUserChallengesFromCredentialsFlow(
    ReduxUtils.extractDataFromPayload,
    UserUtils.extractCredentialsByType(ApiUsersTypes.UserCredentialTypes.Challenge),
  ),
  UserChallengesMiddleware.normaliseUserChallengesFlow(ReduxUtils.normalise),
  UserChallengesMiddleware.setUserChallengesFlow,
  UserMiddleware.fetchUserCredentialsFlow,
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
  SkillsMiddleware.fetchSkillsFlow,
  SkillsMiddleware.fetchSkillsSuccessFlow,
  SkillsMiddleware.fetchSkillsFailureFlow({ notification: showSimpleMessage }),
  SkillsMiddleware.normaliseSkillsFlow(ReduxUtils.normalise),
  SkillsMiddleware.setSkillsFlow,
  UserMiddleware.fetchUserCredentialsFlow,
  UserMiddleware.fetchUserCredentialsFailureFlow({ notification: showSimpleMessage }),
  JobsMiddleware.createJobFlow,
  JobsMiddleware.createJobSuccessFlow,
  JobsMiddleware.createJobFailureFlow({ notification: showSimpleMessage }),
  UserJobsMiddleware.getUserJobsFromCredentialsFlow(
    ReduxUtils.extractDataFromPayload,
    UserUtils.extractCredentialsByType(ApiUsersTypes.UserCredentialTypes.Job),
  ),
  UserJobsMiddleware.normaliseUserJobsFlow(ReduxUtils.normalise),
  UserJobsMiddleware.setUserJobsFlow,
  UserJobsMiddleware.createUserJobFlow,
  UserJobsMiddleware.setUserJobsFormValuesFlow,
  UserJobsMiddleware.createUserJobSuccessFlow,
  UserJobsMiddleware.createUserJobFailureFlow({ notification: showSimpleMessage }),
  UserJobsMiddleware.fetchUserJobByIdFlow,
  UserJobsMiddleware.fetchUserJobByIdSuccessFlow({ notification: showSimpleMessage }),
  UserJobsMiddleware.fetchUserJobByIdFailureFlow({ notification: showSimpleMessage }),
]

const middleware = concat(commonMiddleware, featureModuleMiddleware)

const combinedMiddleware = __DEV__ ? concat(middleware, devMiddleware) : middleware

export default combinedMiddleware
