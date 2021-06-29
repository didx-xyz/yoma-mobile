import { setItemAsync } from 'expo-secure-store'
import { concat } from 'ramda'
import { Middleware } from 'redux'

import api, { apiConfig, middleware as apiMiddleware } from '../api'
import { prepareApiRequest } from '../api/api.utils'
import { middleware as authMiddleware } from '../modules/Auth'
import { middleware as userMiddleware } from '../modules/User'
import { showSimpleMessage } from '../utils/error'

const createDebugger = require('redux-flipper').default

const devMiddleware = [createDebugger()]

const commonMiddleware: Middleware[] = [
  apiMiddleware.apiFlow({ api: apiConfig.createApiClient, prepArgs: prepareApiRequest }),
]

const featureModuleMiddleware = [
  authMiddleware.authLoginFlow,
  authMiddleware.authLoginSuccessFlow({ notification: showSimpleMessage }),
  authMiddleware.authLoginFailureFlow({ notification: showSimpleMessage }),
  authMiddleware.authRegistrationFlow({ api }),
  authMiddleware.setSecureRefreshTokenFlow(setItemAsync),
  authMiddleware.authRegistrationSuccessFlow({ notification: showSimpleMessage }),
  authMiddleware.authRegistrationFailureFlow({ notification: showSimpleMessage }),
  userMiddleware.setUserOnAuthFlow,
]

const middleware = concat(commonMiddleware, featureModuleMiddleware)

const combinedMiddleware = __DEV__ ? concat(middleware, devMiddleware) : middleware

export default combinedMiddleware
