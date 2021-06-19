import { setItemAsync } from 'expo-secure-store'
import { concat } from 'ramda'
import { Middleware } from 'redux'

import api from '../api'
import { middleware as apiMiddleware, apiConfig } from '../api'
import { prepareApiRequest } from '../api/api.utils'
import { middleware as authMiddleware } from '../modules/Auth'
import { showSimpleMessage } from '../utils/error'

const createDebugger = require('redux-flipper').default

const devMiddleware = [createDebugger()]

const commonMiddleware: Middleware[] = [
  apiMiddleware.apiFlow({ api: apiConfig.createApiClient, prepArgs: prepareApiRequest }),
]

const featureModuleMiddleware = [
  authMiddleware.authLoginFlow({ api }),
  authMiddleware.authSetCredentialsFlow({ notification: showSimpleMessage }),
  authMiddleware.authLoginFailureFlow({ notification: showSimpleMessage }),
  authMiddleware.authRegistrationFlow({ api }),
  authMiddleware.setSecureRefreshTokenFlow(setItemAsync),
  authMiddleware.authRegistrationSuccessFlow({ notification: showSimpleMessage }),
  authMiddleware.authRegistrationFailureFlow({ notification: showSimpleMessage }),
]

const middleware = concat(commonMiddleware, featureModuleMiddleware)

const combinedMiddleware = __DEV__ ? concat(middleware, devMiddleware) : middleware

export default combinedMiddleware
