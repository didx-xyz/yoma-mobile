import { curry, lensPath, map, view } from 'ramda'

import { Providers } from './Social.types'

const remap = curry((desc: any, obj: any) => map((path: any) => view(lensPath(path), obj), desc))

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
  providerKey: ['user', 'userId'],
  token: ['idToken'],
})

export const mapFacebookLoginData = remap({
  provider: Providers.Facebook,
  providerKey: ['applicationID'],
  token: ['accessToken'],
})

export const mapGoogleLoginData = remap({
  provider: Providers.Google,
  providerKey: ['userId'],
  token: ['idToken'],
})

export const selectLoginCredentials = (authProvider: string, authData: {}) => {
  switch (authProvider) {
    case Providers.Facebook:
      return mapFacebookLoginData(authData)
    case Providers.Google:
      return mapGoogleLoginData(authData)
  }
}
export const selectRegistrationCredentials = (authProvider: string, authData: {}) => {
  switch (authProvider) {
    case Providers.Facebook:
      return mapFacebookRegistrationData(authData)
    case Providers.Google:
      return mapGoogleRegistrationData(authData)
  }
}
