import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import { always, applySpec, merge, path, prop } from 'ramda'
import { AccessToken, LoginManager, Profile } from 'react-native-fbsdk-next'

import { GOOGLE_SIGNIN_WEBCLIENT_ID } from './SSOAuth.constants'
import { Providers } from './SSOAuth.types'

export const extractRegistrationCredentialsFromFacebook = applySpec({
  email: prop('email'),
  firstName: prop('firstName'),
  lastName: prop('lastName'),
  provider: always(Providers.Facebook),
  providerKey: prop('applicationID'),
  token: prop('accessToken'),
})

export const extractRegistrationCredentialsFromGoogle = applySpec({
  email: path(['user', 'email']),
  firstName: path(['user', 'givenName']),
  lastName: path(['user', 'familyName']),
  provider: always(Providers.Google),
  providerKey: always(GOOGLE_SIGNIN_WEBCLIENT_ID),
  token: prop('idToken'),
})

export const extractLoginCredentialsFromFacebook = applySpec({
  provider: always(Providers.Facebook),
  providerKey: prop('applicationID'),
  token: prop('accessToken'),
})

export const extractLoginCredentialsFromGoogle = applySpec({
  provider: always(Providers.Google),
  providerKey: always(GOOGLE_SIGNIN_WEBCLIENT_ID),
  token: prop('idToken'),
})

export const selectSocialLoginCredentials = (authProvider: Providers, authData: any) => {
  switch (authProvider) {
    case Providers.Facebook:
      return extractLoginCredentialsFromFacebook(authData)
    case Providers.Google:
      return extractLoginCredentialsFromGoogle(authData)
  }
}
export const selectRegistrationCredentials = (authProvider: Providers, authData: any) => {
  switch (authProvider) {
    case Providers.Facebook:
      return extractRegistrationCredentialsFromFacebook(authData)
    case Providers.Google:
      return extractRegistrationCredentialsFromGoogle(authData)
  }
}

export const onFacebookAuth = async () => {
  try {
    const result = await LoginManager.logInWithPermissions(['email', 'public_profile'])
    const currentProfile = await Profile.getCurrentProfile()
    const accessToken = await AccessToken.getCurrentAccessToken()

    if (!result.isCancelled) {
      const authResponse = merge(currentProfile, accessToken)
      return authResponse
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const onGoogleAuth = async () => {
  try {
    await GoogleSignin.configure({
      webClientId: GOOGLE_SIGNIN_WEBCLIENT_ID,
      offlineAccess: true,
    })
    await GoogleSignin.hasPlayServices()
    const authData = await GoogleSignin.signIn()
    const authResponse = authData as object
    return authResponse
  } catch (error) {
    let errorMessage
    if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      errorMessage = 'Play Services not available or outdated'
    } else if (error.code === statusCodes.SIGN_IN_REQUIRED) {
      errorMessage = 'Please sign in with your google account'
    } else if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      errorMessage = 'Authentication cancelled'
    } else {
      errorMessage = 'An error occurred'
    }
    throw new Error(errorMessage)
  }
}
