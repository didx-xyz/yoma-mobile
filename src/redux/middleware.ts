import { setItemAsync } from 'expo-secure-store'
import { middleware as appMiddleware } from 'modules/App'
import { photoUploadFormConfig } from 'modules/Profile/Profile.constants'
import ssoAuth from 'modules/SSOAuth'
import { concat } from 'ramda'
import ImagePicker from 'react-native-image-crop-picker'
import { Middleware } from 'redux'

import { apiConfig, middleware as apiMiddleware } from '../api'
import { prepareApiRequest } from '../api/api.utils'
import { middleware as authMiddleware } from '../modules/Auth'
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
  userMiddleware.uploadUserPhotoFlow({
    imagePicker: ImagePicker,
    formConfig: photoUploadFormConfig,
  }),
  userMiddleware.uploadUserPhotoSuccessFlow,
  userMiddleware.uploadUserPhotoFailureFlow({ notification: showSimpleMessage }),
  userMiddleware.updateUserPhotoSuccessFlow({ notification: showSimpleMessage }),
  userMiddleware.updateUserPhotoFailureFlow({ notification: showSimpleMessage }),
]

const middleware = concat(commonMiddleware, featureModuleMiddleware)

const combinedMiddleware = __DEV__ ? concat(middleware, devMiddleware) : middleware

export default combinedMiddleware
