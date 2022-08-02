import { countries } from 'countries-list'
import FormData from 'form-data'
import { concat } from 'ramda'
import EncryptedStorage from 'react-native-encrypted-storage'
import ImagePicker from 'react-native-image-crop-picker'
import { Middleware } from 'redux'

import { middleware as ApiMiddleware, utils as ApiUtils, apiConfig } from '~/api'
import { types as ApiUsersTypes } from '~/api/users'
import { middleware as AppMiddleware } from '~/modules/App'
import { middleware as AuthMiddleware } from '~/modules/Auth'
import { middleware as ChallengesMiddleware } from '~/modules/Challenges'
import { middleware as CountriesMiddleware } from '~/modules/Countries'
import { middleware as ErrorMiddleware } from '~/modules/Error'
import { middleware as JobsMiddleware } from '~/modules/Jobs'
import * as Navigation from '~/modules/Navigation/Navigation.utils'
import { middleware as OrganisationsMiddleware } from '~/modules/Organisations'
import { middleware as QualificationsMiddleware } from '~/modules/Qualifications'
import { middleware as SkillsMiddleware } from '~/modules/Skills'
import { middleware as UserMiddleware, utils as UserUtils } from '~/modules/User'
import { middleware as UserChallengesMiddleware } from '~/modules/UserChallenges'
import { middleware as UserJobsMiddleware } from '~/modules/UserJobs'
import { middleware as UserQualificationsMiddleware } from '~/modules/UserQualifications'
import { middleware as UserSkillsMiddleware } from '~/modules/UserSkills'
import { showSimpleMessage } from '~/utils/error'

import * as ReduxUtils from './redux.utils'

const createDebugger = require('redux-flipper').default

const devMiddleware = [createDebugger()]

const commonMiddleware: Middleware[] = [
  ApiMiddleware.apiFlow({ api: apiConfig.createApiClient, prepArgs: ApiUtils.prepareApiRequest }),
  AppMiddleware.appResetFlow,
  AppMiddleware.hydrateAppFlow,
]

const featureModuleMiddleware = [
  AuthMiddleware.authorizeFlow,
  AuthMiddleware.authorizeSuccessFlow,
  AuthMiddleware.authorizeWithRefreshTokenFailureFlow,
  AuthMiddleware.authorizeWithRefreshTokenFlow,
  AuthMiddleware.fetchUserFromOAuthFlow,
  AuthMiddleware.deleteSecureRefreshTokenFlow(EncryptedStorage.removeItem),
  AuthMiddleware.getSecureRefreshTokenFlow(EncryptedStorage.getItem),
  AuthMiddleware.loginFailureFlow({ notification: showSimpleMessage }),
  AuthMiddleware.loginFlow,
  AuthMiddleware.logoutFlow,
  AuthMiddleware.setSecureRefreshTokenFlow(EncryptedStorage.setItem),
  AuthMiddleware.unauthorizedFlow,
  ChallengesMiddleware.fetchChallengesFlow,
  ChallengesMiddleware.normaliseChallengesFlow({ normalise: ReduxUtils.normalise }),
  ChallengesMiddleware.setChallengesFlow,
  CountriesMiddleware.getCountriesFlow({ countryList: countries }),
  CountriesMiddleware.normaliseCountriesFlow,
  CountriesMiddleware.setCountriesFlow,
  ErrorMiddleware.categorizeErrorsFlow,
  JobsMiddleware.createJobFailureFlow({ notification: showSimpleMessage }),
  JobsMiddleware.createJobFlow,
  JobsMiddleware.createJobSuccessFlow,
  OrganisationsMiddleware.fetchOrganisationsFailureFlow({ notification: showSimpleMessage }),
  OrganisationsMiddleware.fetchOrganisationsFlow,
  OrganisationsMiddleware.fetchOrganisationsSuccessFlow,
  OrganisationsMiddleware.normaliseOrganisationsFlow({ normalise: ReduxUtils.normalise }),
  OrganisationsMiddleware.setOrganisationsFlow,
  QualificationsMiddleware.createQualificationFlow,
  QualificationsMiddleware.createQualificationSuccessFlow,
  QualificationsMiddleware.createQualificationFailureFlow({ notification: showSimpleMessage }),
  SkillsMiddleware.fetchSkillsFailureFlow({ notification: showSimpleMessage }),
  SkillsMiddleware.fetchSkillsFlow,
  SkillsMiddleware.fetchSkillsSuccessFlow,
  SkillsMiddleware.normaliseSkillsFlow({ normalise: ReduxUtils.normalise }),
  SkillsMiddleware.setSkillsFlow,
  UserChallengesMiddleware.setUserChallengeFormValuesFlow,
  UserChallengesMiddleware.createUserChallengeFlow,
  UserChallengesMiddleware.createUserChallengeSuccessFlow({
    notification: showSimpleMessage,
    navigate: Navigation.navigate,
  }),
  UserChallengesMiddleware.createUserChallengeFailureFlow({ notification: showSimpleMessage }),
  UserChallengesMiddleware.createUserChallengeCertificateFlow,
  UserChallengesMiddleware.createUserChallengeCertificateSuccessFlow({ normalise: ReduxUtils.normalise }),
  UserChallengesMiddleware.createUserChallengeCertificateFailureFlow({ notification: showSimpleMessage }),
  UserChallengesMiddleware.getUserChallengesFromCredentialsFlow(
    ReduxUtils.extractDataFromResponseAction,
    UserUtils.extractCredentialsByType(ApiUsersTypes.UserCredentialTypes.Challenge),
  ),
  UserChallengesMiddleware.normaliseUserChallengesFlow({ normalise: ReduxUtils.normalise }),
  UserChallengesMiddleware.setUserChallengesFlow,
  UserJobsMiddleware.createUserJobFailureFlow({ notification: showSimpleMessage }),
  UserJobsMiddleware.createUserJobFlow,
  UserJobsMiddleware.createUserJobSuccessFlow,
  UserJobsMiddleware.fetchUserJobByIdFailureFlow({ notification: showSimpleMessage }),
  UserJobsMiddleware.fetchUserJobByIdFlow,
  UserJobsMiddleware.fetchUserJobByIdSuccessFlow({ notification: showSimpleMessage }),
  UserJobsMiddleware.getUserJobsFromCredentialsFlow(
    ReduxUtils.extractDataFromResponseAction,
    UserUtils.extractCredentialsByType(ApiUsersTypes.UserCredentialTypes.Job),
    UserUtils.extractCredentialsFromOpportunityByType(ApiUsersTypes.UserCredentialOpportunityTypes.Job),
  ),
  UserJobsMiddleware.normaliseUserJobsFlow({ normalise: ReduxUtils.normalise }),
  UserJobsMiddleware.setUserJobsFlow,
  UserJobsMiddleware.setUserJobsFormValuesFlow,
  UserMiddleware.fetchUserCredentialsFailureFlow({ notification: showSimpleMessage }),
  UserMiddleware.fetchUserCredentialsFlow,
  UserMiddleware.setUserOnAuthFlow,
  UserMiddleware.fetchUserDetailsFlow,
  UserMiddleware.fetchUserDetailsSuccessFlow,
  UserMiddleware.hydrateUserFlow,
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
    ReduxUtils.extractDataFromResponseAction,
    UserUtils.extractCredentialsByType(ApiUsersTypes.UserCredentialTypes.Qualification),
  ),
  UserQualificationsMiddleware.normaliseUserQualificationsFlow({ normalise: ReduxUtils.normalise }),
  UserQualificationsMiddleware.setUserQualificationsFlow,
  UserQualificationsMiddleware.setUserQualificationFormValuesFlow,
  UserQualificationsMiddleware.createUserQualificationFlow,
  UserQualificationsMiddleware.createUserQualificationSuccessFlow({
    normalise: ReduxUtils.normalise,
    notification: showSimpleMessage,
  }),
  UserQualificationsMiddleware.createUserQualificationFailureFlow({ notification: showSimpleMessage }),
  UserQualificationsMiddleware.createUserQualificationCertificateFlow,
  UserQualificationsMiddleware.createUserQualificationCertificateSuccessFlow({ normalise: ReduxUtils.normalise }),
  UserQualificationsMiddleware.createUserQualificationCertificateFailureFlow({ notification: showSimpleMessage }),
  UserSkillsMiddleware.fetchUserSkillsFailureFlow({ notification: showSimpleMessage }),
  UserSkillsMiddleware.fetchUserSkillsFlow,
  UserSkillsMiddleware.fetchUserSkillsSuccessFlow,
  UserSkillsMiddleware.addUserSkillsFlow,
  UserSkillsMiddleware.addUserSkillsSuccessFlow({ notification: showSimpleMessage }),
  UserSkillsMiddleware.addUserSkillsFailureFlow({ notification: showSimpleMessage }),
]

const middleware = concat(commonMiddleware, featureModuleMiddleware)

const combinedMiddleware = __DEV__ ? concat(middleware, devMiddleware) : middleware

export default combinedMiddleware
