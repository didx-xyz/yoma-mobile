import { concat } from 'ramda'
import { Middleware } from 'redux'

import api, { apiConfig, middleware as apiMiddleware } from '../api'
import { prepareApiRequest } from '../api/api.utils'
import * as appMiddleware from '../modules/App/App.middleware'
import { middleware as authMiddleware } from '../modules/Auth'
import { showSimpleMessage } from '../utils/error'

const createDebugger = require('redux-flipper').default

const devMiddleware = [createDebugger()]

const commonMiddleware: Middleware[] = [
  apiMiddleware.apiFlow({ api: apiConfig.createApiClient, prepArgs: prepareApiRequest }),
  appMiddleware.appResetFlow,
]

const featureModuleMiddleware = [
  authMiddleware.authLoginFlow({ api }),
  authMiddleware.authSetCredentialsFlow({ notification: showSimpleMessage }),
  authMiddleware.authLoginFailureFlow({ notification: showSimpleMessage }),
  authMiddleware.authRegistrationFlow({ api }),
  authMiddleware.authRegistrationSuccessFlow({ notification: showSimpleMessage }),
  authMiddleware.authRegistrationFailureFlow({ notification: showSimpleMessage }),
]

const middleware = concat(commonMiddleware, featureModuleMiddleware)

const combinedMiddleware = __DEV__ ? concat(middleware, devMiddleware) : middleware

export default combinedMiddleware
