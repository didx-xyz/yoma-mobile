import { setItemAsync } from 'expo-secure-store'
import { middleware as appMiddleware } from 'modules/App'
import Navigation from 'modules/Navigation'
import ssoAuth from 'modules/SSOAuth'
import { concat } from 'ramda'
import { Middleware } from 'redux'

import { apiConfig, middleware as apiMiddleware } from '../api'
import { prepareApiRequest } from '../api/api.utils'
import { middleware as authMiddleware } from '../modules/Auth'
import { middleware as credentialMiddleware } from '../modules/Credentials'
import { middleware as userMiddleware } from '../modules/User'
import { showSimpleMessage } from '../utils/error'

const createDebugger = require('redux-flipper').default

const devMiddleware = [createDebugger()]

const commonMiddleware: Middleware[] = [
  apiMiddleware.apiFlow({ api: apiConfig.createApiClient, prepArgs: prepareApiRequest }),
  appMiddleware.appResetFlow,
  appMiddleware.hydrateAppFlow,
]

const featureModuleMiddleware = [
  authMiddleware.authLoginFlow,
  authMiddleware.authLogoutFlow,
  authMiddleware.authRegistrationFlow,
  authMiddleware.authSocialRegistrationSuccessFlow,
  authMiddleware.authSocialLoginSuccessFlow,
  authMiddleware.authSocialLoginFlow({ ssoAuth, notification: showSimpleMessage }),
  authMiddleware.authSocialRegistrationFlow({ ssoAuth }),
  authMiddleware.authLoginSuccessFlow({ notification: showSimpleMessage }),
  authMiddleware.authLoginFailureFlow({ notification: showSimpleMessage }),
  authMiddleware.authSocialRegistrationFailureFlow({ notification: showSimpleMessage }),
  authMiddleware.authSocialLoginFailureFlow({ notification: showSimpleMessage }),
  authMiddleware.setSecureRefreshTokenFlow(setItemAsync),
  authMiddleware.authRegistrationSuccessFlow({ notification: showSimpleMessage }),
  authMiddleware.authRegistrationFailureFlow({ notification: showSimpleMessage }),
  userMiddleware.setUserOnAuthFlow,
  userMiddleware.updateUserFlow,
  userMiddleware.updateUserSuccessFlow({ notification: showSimpleMessage }),
  userMiddleware.updateUserFailureFlow({ notification: showSimpleMessage }),
  userMiddleware.fetchUserCredentialsFlow,
  credentialMiddleware.createCredentialsFlow,
  credentialMiddleware.updateCredentialsFlow,
  credentialMiddleware.setCredentialsFlow,
  credentialMiddleware.updateCredentialsSuccessFlow({ notification: showSimpleMessage, navigation: Navigation }),
  credentialMiddleware.updateCredentialsFailureFlow({ notification: showSimpleMessage }),
  credentialMiddleware.createCredentialsSuccessFlow({ notification: showSimpleMessage, navigation: Navigation }),
  credentialMiddleware.createCredentialsFailureFlow({ notification: showSimpleMessage }),
]

const middleware = concat(commonMiddleware, featureModuleMiddleware)

const combinedMiddleware = __DEV__ ? concat(middleware, devMiddleware) : middleware

export default combinedMiddleware
