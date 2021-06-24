import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import { AccessToken, LoginManager, Profile } from 'react-native-fbsdk-next'

import { GOOGLE_SIGNIN_WEBCLIENT_ID } from './Social.constants'

export const facebookSignIn = async () => {
  try {
    const result = await LoginManager.logInWithPermissions(['email', 'public_profile'])
    const currentProfile = await Profile.getCurrentProfile()
    const accessToken = await AccessToken.getCurrentAccessToken()
    // do nothing when cancelled
    if (!result.isCancelled) {
      const details = Object.assign({}, currentProfile, accessToken)
      return details
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const googleSignIn = async () => {
  try {
    await GoogleSignin.configure({
      webClientId: GOOGLE_SIGNIN_WEBCLIENT_ID,
      offlineAccess: true,
    })
    await GoogleSignin.hasPlayServices()
    const authData = await GoogleSignin.signIn()
    const details = Object.assign({}, authData)
    return details
  } catch (error) {
    let errorMessage
    if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      errorMessage = 'Play Services not available or outdated'
    } else {
      errorMessage = 'An error occured'
    }
    throw new Error(errorMessage)
  }
}
