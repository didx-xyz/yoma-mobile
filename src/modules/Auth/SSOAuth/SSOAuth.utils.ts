import { always, applySpec, merge, path, prop } from 'ramda'

import { facebookAuthDependencies, googleAuthDependencies } from './../../SSOAuth/SSOAuth.types'
import { FACEBOOK_PERMISSIONS, GOOGLE_AUTH_CONFIG, GOOGLE_SIGNIN_WEBCLIENT_ID } from './SSOAuth.constants'
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

export const onFacebookAuth = async ({ fbLoginManager, fbProfile, fbAccessToken }: facebookAuthDependencies) => {
  try {
    const loginResponse = await fbLoginManager.logInWithPermissions(FACEBOOK_PERMISSIONS)

    const userProfile = await fbProfile.getCurrentProfile()
    const accessToken = await fbAccessToken.getCurrentAccessToken()

    if (!loginResponse.isCancelled) {
      const authResponse = merge(userProfile, accessToken)
      return authResponse as object
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const onGoogleAuth = async ({ googleSignIn, googleStatusCodes }: googleAuthDependencies) => {
  try {
    await googleSignIn.configure(GOOGLE_AUTH_CONFIG)
    await googleSignIn.hasPlayServices()
    const authResponse = await googleSignIn.signIn()
    return authResponse as object
  } catch (error) {
    let errorMessage
    if (error.code !== googleStatusCodes.SIGN_IN_CANCELLED) {
      if (error.code === googleStatusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        errorMessage = 'Play Services not available or outdated'
      } else if (error.code === googleStatusCodes.SIGN_IN_REQUIRED) {
        errorMessage = 'Please sign in with your google account'
      } else {
        errorMessage = 'An error occurred'
      }
      throw new Error(errorMessage)
    }
  }
}
