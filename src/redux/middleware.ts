import api from 'api'
import { concat } from 'ramda'
import { Middleware } from 'redux'

// import api from '../api'
import { middleware as authMiddleware } from '../modules/Auth'

const createDebugger = require('redux-flipper').default

const devMiddleware = [createDebugger()]

const commonMiddleware: Middleware[] = []

const featureModuleMiddleware = [authMiddleware.authLoginFlow({ api }), authMiddleware.authSetCredentialsFlow()]

const middleware = concat(commonMiddleware, featureModuleMiddleware)

const combinedMiddleware = __DEV__ ? concat(middleware, devMiddleware) : middleware

export default combinedMiddleware
