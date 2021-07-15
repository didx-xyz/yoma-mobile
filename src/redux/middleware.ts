import * as SecureStore from 'expo-secure-store'
import { concat } from 'ramda'
import { Middleware } from 'redux'

import { apiConfig, middleware as ApiMiddleware } from '../api'
import { prepareApiRequest } from '../api/api.utils'
import { middleware as AppMiddleware } from '../modules/App'
import { middleware as AuthMiddleware } from '../modules/Auth'
import { middleware as ErrorMiddleware } from '../modules/Error'
import { middleware as UserMiddleware } from '../modules/User'
import { showSimpleMessage } from '../utils/error'

const createDebugger = require('redux-flipper').default

const devMiddleware = [createDebugger()]

const commonMiddleware: Middleware[] = [
  ApiMiddleware.apiFlow({ api: apiConfig.createApiClient, prepArgs: prepareApiRequest }),
  AppMiddleware.appResetFlow,
  AppMiddleware.hydrateAppFlow,
]

const featureModuleMiddleware = [
  AuthMiddleware.authorizeFlow,
  AuthMiddleware.authorizeSuccessFlow({ notification: showSimpleMessage }),
  AuthMiddleware.authorizeWithRefreshTokenFailureFlow,
  AuthMiddleware.authorizeWithRefreshTokenFlow,
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
  UserMiddleware.fetchUserCredentialsFlow,
  UserMiddleware.setUserOnAuthFlow,
]

const middleware = concat(commonMiddleware, featureModuleMiddleware)

const combinedMiddleware = __DEV__ ? concat(middleware, devMiddleware) : middleware

export default combinedMiddleware
