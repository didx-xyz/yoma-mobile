import { facebookSignIn, googleSignIn } from './SSOAuth.config'
import { Providers } from './SSOAuth.types'

export default (provider: string) => {
  switch (provider) {
    case Providers.Facebook:
      return facebookSignIn()
    case Providers.Google:
      return googleSignIn()
  }
}
