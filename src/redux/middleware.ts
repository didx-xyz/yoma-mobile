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
import { middleware as EducationMiddleware } from '~/modules/Education'
import { middleware as ErrorMiddleware } from '~/modules/Error'
import { utils as NavigationUtils } from '~/modules/Navigation'
import { middleware as OrganisationsMiddleware } from '~/modules/Organisations'
import { middleware as QualificationsMiddleware } from '~/modules/Qualifications'
import { middleware as SkillsMiddleware } from '~/modules/Skills'
import { middleware as UserMiddleware, utils as UserUtils } from '~/modules/User'
import { middleware as UserChallengesMiddleware } from '~/modules/UserChallenges'
import { middleware as UserEducationMiddleware } from '~/modules/UserEducation'
import { middleware as UserQualificationsMiddleware } from '~/modules/UserQualifications'
import { middleware as UserSkillsMiddleware } from '~/modules/UserSkills'
import { middleware as UserWorkExperiencesMiddleware } from '~/modules/UserWorkExperience'
import { middleware as WorkExperienceMiddleware } from '~/modules/WorkExperience'
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
  OrganisationsMiddleware.fetchOrganisationsFailureFlow({ notification: showSimpleMessage }),
  OrganisationsMiddleware.fetchOrganisationsFlow,
  OrganisationsMiddleware.fetchOrganisationsSuccessFlow,
  OrganisationsMiddleware.normaliseOrganisationsFlow({ normalise: ReduxUtils.normalise }),
  OrganisationsMiddleware.setOrganisationsFlow,
  QualificationsMiddleware.createQualificationFlow,
  QualificationsMiddleware.createQualificationSuccessFlow,
  QualificationsMiddleware.createQualificationFailureFlow({ notification: showSimpleMessage }),
  EducationMiddleware.createEducationFlow,
  EducationMiddleware.createEducationSuccessFlow,
  EducationMiddleware.createEducationFailureFlow({ notification: showSimpleMessage }),
  SkillsMiddleware.fetchSkillsFailureFlow({ notification: showSimpleMessage }),
  SkillsMiddleware.fetchSkillsFlow,
  SkillsMiddleware.fetchSkillsSuccessFlow,
  SkillsMiddleware.normaliseSkillsFlow({ normalise: ReduxUtils.normalise }),
  SkillsMiddleware.setSkillsFlow,
  UserChallengesMiddleware.setUserChallengeFormValuesFlow,
  UserChallengesMiddleware.createUserChallengeFlow,
  UserChallengesMiddleware.createUserChallengeSuccessFlow({
    notification: showSimpleMessage,
    navigate: NavigationUtils.navigate,
  }),
  UserChallengesMiddleware.createUserChallengeFailureFlow({ notification: showSimpleMessage }),
  UserChallengesMiddleware.createUserChallengeCertificateFlow,
  UserChallengesMiddleware.createUserChallengeCertificateSuccessFlow({ normalise: ReduxUtils.normalise }),
  UserChallengesMiddleware.createUserChallengeCertificateFailureFlow({ notification: showSimpleMessage }),
  UserChallengesMiddleware.getUserChallengesFromCredentialsFlow(
    ReduxUtils.extractDataFromResponseAction,
    UserUtils.extractUserCredentials(ApiUsersTypes.UserCredentialTypes.Challenge),
  ),
  UserChallengesMiddleware.normaliseUserChallengesFlow({ normalise: ReduxUtils.normalise }),
  UserChallengesMiddleware.setUserChallengesFlow,
  UserEducationMiddleware.getUserEducationFromCredentialsFlow(
    ReduxUtils.extractDataFromResponseAction,
    UserUtils.extractUserCredentials(ApiUsersTypes.UserCredentialTypes.Education),
  ),
  UserEducationMiddleware.normaliseUserEducationFlow({ normalise: ReduxUtils.normalise }),
  UserEducationMiddleware.setUserEducationFlow,
  UserEducationMiddleware.setUserEducationFormValuesFlow,
  UserEducationMiddleware.createUserEducationFlow,
  UserEducationMiddleware.createUserEducationSuccessFlow({
    normalise: ReduxUtils.normalise,
    notification: showSimpleMessage,
  }),
  UserEducationMiddleware.createUserEducationFailureFlow({ notification: showSimpleMessage }),
  UserEducationMiddleware.createUserEducationCertificateFlow,
  UserEducationMiddleware.createUserEducationCertificateSuccessFlow({ normalise: ReduxUtils.normalise }),
  UserEducationMiddleware.createUserEducationCertificateFailureFlow({ notification: showSimpleMessage }),
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
    UserUtils.extractUserCredentials(ApiUsersTypes.UserCredentialTypes.Qualification),
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
  UserWorkExperiencesMiddleware.createUserWorkExperienceFailureFlow({ notification: showSimpleMessage }),
  UserWorkExperiencesMiddleware.createUserWorkExperienceFlow,
  UserWorkExperiencesMiddleware.createUserWorkExperienceSuccessFlow,
  UserWorkExperiencesMiddleware.fetchUserWorkExperienceByIdFailureFlow({ notification: showSimpleMessage }),
  UserWorkExperiencesMiddleware.fetchUserWorkExperienceByIdFlow,
  UserWorkExperiencesMiddleware.fetchUserWorkExperienceByIdSuccessFlow({ notification: showSimpleMessage }),
  UserWorkExperiencesMiddleware.getUserWorkExperiencesFromCredentialsFlow(
    ReduxUtils.extractDataFromResponseAction,
    UserUtils.extractUserCredentials(ApiUsersTypes.UserCredentialTypes.WorkExperience),
  ),
  UserWorkExperiencesMiddleware.normaliseUserWorkExperiencesFlow({ normalise: ReduxUtils.normalise }),
  UserWorkExperiencesMiddleware.setUserWorkExperiencesFlow,
  UserWorkExperiencesMiddleware.setUserWorkExperiencesFormValuesFlow,
  WorkExperienceMiddleware.createWorkExperienceFailureFlow({ notification: showSimpleMessage }),
  WorkExperienceMiddleware.createWorkExperienceFlow,
  WorkExperienceMiddleware.createWorkExperienceSuccessFlow,
]

const middleware = concat(commonMiddleware, featureModuleMiddleware)

const combinedMiddleware = __DEV__ ? concat(middleware, devMiddleware) : middleware

export default combinedMiddleware
