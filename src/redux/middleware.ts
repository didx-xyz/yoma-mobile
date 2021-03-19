import { concat } from 'ramda'
import { Middleware } from 'redux'

import { middleware as authMiddleware } from '../modules/Auth'

const createDebugger = require('redux-flipper').default

const devMiddleware = [createDebugger()]

const commonMiddleware: Middleware[] = []

const featureModuleMiddleware = [authMiddleware.authorizeFlow(), authMiddleware.logoutFlow()]

const middleware = concat(commonMiddleware, featureModuleMiddleware)

const combinedMiddleware = __DEV__ ? concat(middleware, devMiddleware) : middleware

export default combinedMiddleware
