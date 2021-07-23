import * as SecureStore from 'expo-secure-store'
import Navigation from 'modules/Navigation'
import { concat } from 'ramda'
import { Middleware } from 'redux'

import { apiConfig, middleware as ApiMiddleware, utils as ApiUtils } from '../api'
import { middleware as AppMiddleware } from '../modules/App'
import { middleware as AuthMiddleware } from '../modules/Auth'
import { middleware as CredentialMiddleware } from '../modules/Credentials'
import { middleware as ErrorMiddleware } from '../modules/Error'
import { middleware as OrganisationsMiddleware } from '../modules/Organisations'
import ssoAuth from '../modules/SSOAuth'
import { middleware as SkillsMiddleware } from '../modules/Skills'
import { middleware as UserMiddleware } from '../modules/User'
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
  CredentialMiddleware.fetchUserCredentialsFlow,
  CredentialMiddleware.createCredentialsFlow,
  CredentialMiddleware.updateCredentialsFlow,
  CredentialMiddleware.setCredentialsFlow,
  CredentialMiddleware.updateCredentialsSuccessFlow({ notification: showSimpleMessage, navigation: Navigation }),
  CredentialMiddleware.updateCredentialsFailureFlow({ notification: showSimpleMessage }),
  CredentialMiddleware.createCredentialsSuccessFlow({ notification: showSimpleMessage, navigation: Navigation }),
  CredentialMiddleware.createCredentialsFailureFlow({ notification: showSimpleMessage }),
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
]

const middleware = concat(commonMiddleware, featureModuleMiddleware)

const combinedMiddleware = __DEV__ ? concat(middleware, devMiddleware) : middleware

export default combinedMiddleware
