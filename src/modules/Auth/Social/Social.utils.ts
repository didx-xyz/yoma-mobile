import { always, applySpec, path, prop } from 'ramda'

import { GOOGLE_SIGNIN_WEBCLIENT_ID } from './Social.constants'
import { Providers } from './Social.types'

export const selectRegistrationCredentialsFromFacebook = applySpec({
  email: prop('email'),
  firstName: prop('firstName'),
  lastName: prop('lastName'),
  provider: always(Providers.Facebook),
  providerKey: prop('applicationID'),
  token: prop('accessToken'),
})

export const selectRegistrationCredentialsFromGoogle = applySpec({
  email: path(['user', 'email']),
  firstName: path(['user', 'givenName']),
  lastName: path(['user', 'familyName']),
  provider: always(Providers.Google),
  providerKey: always(GOOGLE_SIGNIN_WEBCLIENT_ID),
  token: prop('idToken'),
})

export const selectLoginCredentialsFromFacebook = applySpec({
  provider: always(Providers.Facebook),
  providerKey: prop('applicationID'),
  token: prop('accessToken'),
})

export const selectLoginCredentialsFromGoogle = applySpec({
  provider: always(Providers.Google),
  providerKey: always(GOOGLE_SIGNIN_WEBCLIENT_ID),
  token: prop('idToken'),
})

export const selectSocialLoginCredentials = (authProvider: Providers, authData: any) => {
  switch (authProvider) {
    case Providers.Facebook:
      return selectLoginCredentialsFromFacebook(authData)
    case Providers.Google:
      return selectLoginCredentialsFromGoogle(authData)
  }
}
export const selectRegistrationCredentials = (authProvider: Providers, authData: any) => {
  switch (authProvider) {
    case Providers.Facebook:
      return selectRegistrationCredentialsFromFacebook(authData)
    case Providers.Google:
      return selectRegistrationCredentialsFromGoogle(authData)
  }
}
