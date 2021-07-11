import { Providers } from './SSOAuth.types'
import { onFacebookAuth, onGoogleAuth } from './SSOAuth.utils'

export default (provider: string) => {
  switch (provider) {
    case Providers.Facebook:
      return onFacebookAuth()
    case Providers.Google:
      return onGoogleAuth()
  }
}
