import { setItemAsync } from 'expo-secure-store'
import { middleware as appMiddleware } from 'modules/App'
import socialAuth from 'modules/Auth/SSOAuth'
import { concat } from 'ramda'
import { Middleware } from 'redux'

import { apiConfig, middleware as apiMiddleware } from '../api'
import { prepareApiRequest } from '../api/api.utils'
import { middleware as authMiddleware } from '../modules/Auth'
import { showSimpleMessage } from '../utils/error'

const createDebugger = require('redux-flipper').default

const devMiddleware = [createDebugger()]

const commonMiddleware: Middleware[] = [
  apiMiddleware.apiFlow({ api: apiConfig.createApiClient, prepArgs: prepareApiRequest }),
  appMiddleware.appResetFlow,
]

const featureModuleMiddleware = [
  authMiddleware.authLoginFlow,
  authMiddleware.authLogoutFlow,
  authMiddleware.authRegistrationFlow,
  authMiddleware.authSocialRegistrationSuccessFlow,
  authMiddleware.authSocialLoginSuccessFlow,
  authMiddleware.authSocialLoginFlow({ socialAuth, notification: showSimpleMessage }),
  authMiddleware.authSocialRegistrationFlow({ socialAuth }),
  authMiddleware.authLoginSuccessFlow({ notification: showSimpleMessage }),
  authMiddleware.authLoginFailureFlow({ notification: showSimpleMessage }),
  authMiddleware.authSocialRegistrationFailureFlow({ notification: showSimpleMessage }),
  authMiddleware.authSocialLoginFailureFlow({ notification: showSimpleMessage }),
  authMiddleware.setSecureRefreshTokenFlow(setItemAsync),
  authMiddleware.authRegistrationSuccessFlow({ notification: showSimpleMessage }),
  authMiddleware.authRegistrationFailureFlow({ notification: showSimpleMessage }),
]

const middleware = concat(commonMiddleware, featureModuleMiddleware)

const combinedMiddleware = __DEV__ ? concat(middleware, devMiddleware) : middleware

export default combinedMiddleware
