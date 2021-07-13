import { always, applySpec, merge, path, prop } from 'ramda'

import { FACEBOOK_PERMISSIONS, GOOGLE_AUTH_CONFIG, GOOGLE_SIGNIN_WEBCLIENT_ID } from './SSOAuth.constants'
import { FacebookAuthDependencies, GoogleAuthDependencies, Providers } from './SSOAuth.types'

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

export const onFacebookAuth = async ({
  fbLoginManager,
  fbProfile,
  fbAccessToken,
  fbAuthCancelledErrorMessage = 'Sign in cancelled',
}: FacebookAuthDependencies) => {
  try {
    const loginResponse = await fbLoginManager.logInWithPermissions(FACEBOOK_PERMISSIONS)

    const userProfile = await fbProfile.getCurrentProfile()
    const accessToken = await fbAccessToken.getCurrentAccessToken()

    if (!loginResponse.isCancelled) {
      const authResponse = merge(userProfile, accessToken)
      return authResponse as object
    } else {
      throw new Error(fbAuthCancelledErrorMessage)
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export const onGoogleAuth = async ({ googleSignIn }: GoogleAuthDependencies) => {
  try {
    await googleSignIn.configure(GOOGLE_AUTH_CONFIG)
    await googleSignIn.hasPlayServices()
    const authResponse = await googleSignIn.signIn()
    return authResponse as object
  } catch (error) {
    throw new Error(error.message)
  }
}
