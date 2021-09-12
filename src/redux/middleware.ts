import * as SecureStore from 'expo-secure-store'
import FormData from 'form-data'
import { concat } from 'ramda'
import ImagePicker from 'react-native-image-crop-picker'
import { Middleware } from 'redux'
import * as ReduxUtils from 'utils/redux.utils'

import { middleware as ApiMiddleware, utils as ApiUtils, apiConfig } from '../api'
import { types as ApiUsersTypes } from '../api/users'
import { middleware as AppMiddleware } from '../modules/App'
import { middleware as AuthMiddleware } from '../modules/Auth'
import { middleware as ChallengeMiddleware } from '../modules/Challenges'
import { normaliseChallengesFlow, setChallengesFlow } from '../modules/Challenges/Challenges.middleware'
import { middleware as ErrorMiddleware } from '../modules/Error'
import { middleware as JobsMiddleware } from '../modules/Jobs'
import { middleware as OrganisationsMiddleware } from '../modules/Organisations'
import ssoAuth from '../modules/SSOAuth'
import { middleware as SkillsMiddleware } from '../modules/Skills'
import { middleware as UserMiddleware, utils as UserUtils } from '../modules/User'
import { middleware as UserChallengesMiddleware } from '../modules/UserChallenges'
import { middleware as UserJobsMiddleware } from '../modules/UserJobs'
import { middleware as UserQualificationsMiddleware } from '../modules/UserQualifications'
import { middleware as UserSkillsMiddleware } from '../modules/UserSkills'
import { showSimpleMessage } from '../utils/error'

const createDebugger = require('redux-flipper').default

const devMiddleware = [createDebugger()]

const commonMiddleware: Middleware[] = [
  ApiMiddleware.apiFlow({ api: apiConfig.createApiClient, prepArgs: ApiUtils.prepareApiRequest }),
  AppMiddleware.appResetFlow,
  AppMiddleware.hydrateAppFlow,
]

const featureModuleMiddleware = [
  AuthMiddleware.authorizeFlow,
  AuthMiddleware.authorizeSuccessFlow({ notification: showSimpleMessage }),
  AuthMiddleware.authorizeWithRefreshTokenFailureFlow,
  AuthMiddleware.authorizeWithRefreshTokenFlow,
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
  ChallengeMiddleware.fetchChallengesFlow,
  ChallengeMiddleware.normaliseChallengesFlow(ReduxUtils.normalise),
  ChallengeMiddleware.setChallengesFlow,
  ErrorMiddleware.categorizeErrorsFlow,
  JobsMiddleware.createJobFailureFlow({ notification: showSimpleMessage }),
  JobsMiddleware.createJobFlow,
  JobsMiddleware.createJobSuccessFlow,
  OrganisationsMiddleware.fetchOrganisationsFailureFlow({ notification: showSimpleMessage }),
  OrganisationsMiddleware.fetchOrganisationsFlow,
  OrganisationsMiddleware.fetchOrganisationsSuccessFlow,
  OrganisationsMiddleware.normaliseOrganisationsFlow(ReduxUtils.normalise),
  OrganisationsMiddleware.setOrganisationsFlow,
  SkillsMiddleware.fetchSkillsFailureFlow({ notification: showSimpleMessage }),
  SkillsMiddleware.fetchSkillsFlow,
  SkillsMiddleware.fetchSkillsSuccessFlow,
  SkillsMiddleware.normaliseSkillsFlow(ReduxUtils.normalise),
  SkillsMiddleware.setSkillsFlow,
  UserChallengesMiddleware.getUserChallengesFromCredentialsFlow(
    ReduxUtils.extractDataFromPayload,
    UserUtils.extractCredentialsByType(ApiUsersTypes.UserCredentialTypes.Challenge),
  ),
  UserChallengesMiddleware.normaliseUserChallengesFlow(ReduxUtils.normalise),
  UserChallengesMiddleware.setUserChallengesFlow,
  UserJobsMiddleware.createUserJobFailureFlow({ notification: showSimpleMessage }),
  UserJobsMiddleware.createUserJobFlow,
  UserJobsMiddleware.createUserJobSuccessFlow,
  UserJobsMiddleware.fetchUserJobByIdFailureFlow({ notification: showSimpleMessage }),
  UserJobsMiddleware.fetchUserJobByIdFlow,
  UserJobsMiddleware.fetchUserJobByIdSuccessFlow({ notification: showSimpleMessage }),
  UserJobsMiddleware.getUserJobsFromCredentialsFlow(
    ReduxUtils.extractDataFromPayload,
    UserUtils.extractCredentialsByType(ApiUsersTypes.UserCredentialTypes.Job),
  ),
  UserJobsMiddleware.normaliseUserJobsFlow(ReduxUtils.normalise),
  UserJobsMiddleware.setUserJobsFlow,
  UserJobsMiddleware.setUserJobsFormValuesFlow,
  UserMiddleware.fetchUserCredentialsFailureFlow({ notification: showSimpleMessage }),
  UserMiddleware.fetchUserCredentialsFlow,
  UserMiddleware.setUserOnAuthFlow,
  UserMiddleware.updateUserFailureFlow({ notification: showSimpleMessage }),
  UserMiddleware.updateUserFlow,
  UserMiddleware.updateUserPhotoFailureFlow({ notification: showSimpleMessage }),
  UserMiddleware.updateUserPhotoSuccessFlow({ notification: showSimpleMessage }),
  UserMiddleware.updateUserSuccessFlow({ notification: showSimpleMessage }),
  UserMiddleware.uploadUserPhotoFailureFlow({ notification: showSimpleMessage }),
  UserMiddleware.uploadUserPhotoFlow({
    imagePicker: ImagePicker,
    createPayload: UserUtils.createPhotoFormPayload(FormData),
  }),
  UserMiddleware.uploadUserPhotoSuccessFlow,
  UserQualificationsMiddleware.getUserQualificationsFromCredentialsFlow(
    ReduxUtils.extractDataFromPayload,
    UserUtils.extractCredentialsByType(ApiUsersTypes.UserCredentialTypes.Qualification),
  ),
  UserQualificationsMiddleware.normaliseUserQualificationsFlow(ReduxUtils.normalise),
  UserQualificationsMiddleware.setUserQualificationsFlow,
  UserSkillsMiddleware.fetchUserSkillsFailureFlow({ notification: showSimpleMessage }),
  UserSkillsMiddleware.fetchUserSkillsFlow,
  UserSkillsMiddleware.fetchUserSkillsSuccessFlow,
]

const middleware = concat(commonMiddleware, featureModuleMiddleware)

const combinedMiddleware = __DEV__ ? concat(middleware, devMiddleware) : middleware

export default combinedMiddleware
