import * as SecureStore from 'expo-secure-store'
import { photoUploadFormConfig } from 'modules/Profile/Profile.constants'
import ssoAuth from 'modules/SSOAuth'
import { concat } from 'ramda'
import ImagePicker from 'react-native-image-crop-picker'
import { Middleware } from 'redux'

import { apiConfig, middleware as ApiMiddleware, utils as ApiUtils } from '../api'
import { middleware as AppMiddleware } from '../modules/App'
import { middleware as AuthMiddleware } from '../modules/Auth'
import { middleware as ErrorMiddleware } from '../modules/Error'
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
  ErrorMiddleware.categorizeErrorsFlow,
  UserMiddleware.fetchUserCredentialsFlow,
  UserMiddleware.setUserOnAuthFlow,
  UserMiddleware.updateUserFailureFlow({ notification: showSimpleMessage }),
  UserMiddleware.updateUserFlow,
  UserMiddleware.updateUserSuccessFlow({ notification: showSimpleMessage }),
  UserMiddleware.uploadUserPhotoFlow({
    imagePicker: ImagePicker,
    formConfig: photoUploadFormConfig,
  }),
  UserMiddleware.uploadUserPhotoSuccessFlow,
  UserMiddleware.uploadUserPhotoFailureFlow({ notification: showSimpleMessage }),
  UserMiddleware.updateUserPhotoSuccessFlow({ notification: showSimpleMessage }),
  UserMiddleware.updateUserPhotoFailureFlow({ notification: showSimpleMessage }),
]

const middleware = concat(commonMiddleware, featureModuleMiddleware)

const combinedMiddleware = __DEV__ ? concat(middleware, devMiddleware) : middleware

export default combinedMiddleware
