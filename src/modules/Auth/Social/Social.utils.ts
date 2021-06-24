import { curry, lensPath, map, view } from 'ramda'

import { GOOGLE_SIGNIN_WEBCLIENT_ID } from './Social.constants'
import { Providers } from './Social.types'

const remap = curry((desc: any, obj: any) =>
  map((path: any) => (typeof path === 'string' ? path : view(lensPath(path), obj)), desc),
)
export const mapFacebookRegistrationData = remap({
  email: ['email'],
  firstName: ['firstName'],
  lastName: ['lastName'],
  provider: Providers.Facebook,
  providerKey: ['applicationID'],
  token: ['accessToken'],
})

export const mapGoogleRegistrationData = remap({
  provider: Providers.Google,
  email: ['user', 'email'],
  firstName: ['user', 'givenName'],
  lastName: ['user', 'familyName'],
  providerKey: GOOGLE_SIGNIN_WEBCLIENT_ID,
  token: ['idToken'],
})

export const mapFacebookLoginData = remap({
  provider: Providers.Facebook,
  providerKey: ['applicationID'],
  token: ['accessToken'],
})

export const mapGoogleLoginData = remap({
  provider: Providers.Google,
  providerKey: GOOGLE_SIGNIN_WEBCLIENT_ID,
  token: ['idToken'],
})

export const selectLoginCredentials = (authProvider: string, authData: any) => {
  switch (authProvider) {
    case Providers.Facebook:
      return mapFacebookLoginData(authData)
    case Providers.Google:
      return mapGoogleLoginData(authData)
  }
}
export const selectRegistrationCredentials = (authProvider: string, authData: any) => {
  switch (authProvider) {
    case Providers.Facebook:
      return mapFacebookRegistrationData(authData)
    case Providers.Google:
      return mapGoogleRegistrationData(authData)
  }
}
